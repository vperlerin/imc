# -*- coding: utf-8 -*-

import json
import os
import bcrypt
import MySQLdb  # Python 2 compatible MySQL library

# Define paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSON_PATH = os.path.join(BASE_DIR, "imc", "src", "data", "conference-data.json")
SQL_PATH = os.path.join(BASE_DIR, "python", "insert_data.sql")
ENV_PATH = os.path.join(BASE_DIR, "env", ".env")

# Load environment variables manually
if os.path.exists(ENV_PATH):
    with open(ENV_PATH, "rb") as env_file:
        for line in env_file:
            line = line.strip()
            if line and not line.startswith("#"):
                key, value = line.split("=", 1)
                os.environ[key] = value

# Database connection details from .env
DB_HOST = os.environ.get("MYSQL_HOST", "localhost")
DB_USER = os.environ.get("MYSQL_USER")
DB_PASSWORD = os.environ.get("MYSQL_PASSWORD")
DB_NAME = os.environ.get("MYSQL_DATABASE")

# Connect to MySQL
try:
    conn = MySQLdb.connect(host=DB_HOST, user=DB_USER, passwd=DB_PASSWORD, db=DB_NAME, charset="utf8")
    cursor = conn.cursor()
except MySQLdb.Error as e:
    print "Error connecting to MySQL: %s" % str(e)
    exit(1)

# Function to check if a table is empty (Fix: Ensure table name is properly escaped)
def table_is_empty(table_name):
    try:
        cursor.execute("SELECT COUNT(*) FROM `%s`;" % table_name)  # Ensure table name is properly escaped
        count = cursor.fetchone()[0]
        return count == 0  # Returns True if table is empty
    except MySQLdb.Error as e:
        print "Error checking table %s: %s" % (table_name, str(e))
        return False

# Load JSON data
with open(JSON_PATH, "rb") as file:
    data = json.load(file)

# SQL statement storage
sql_statements = []

# Insert `imc_sessions` if the table is empty
if table_is_empty("imc_sessions"):
    for session in data.get("sessions", []):
        sql_statements.append(
            "INSERT INTO imc_sessions (name) VALUES ('%s');" % session.replace("'", "''")
        )

# Insert `workshops` if the table is empty
if table_is_empty("workshops"):
    for workshop in data.get("workshops", []):
        sql_statements.append(
            "INSERT INTO workshops (title, price) VALUES ('%s', %.2f);" % (
                workshop["title"].replace("'", "''"), float(workshop["cost"])
            )
        )

# Insert `registration_types` (rooms) if the table is empty
if table_is_empty("registration_types"):
    for room in data.get("costs", {}).get("rooms", []):
        total = int(room.get("total", 0))  
        sql_statements.append(
            "INSERT INTO registration_types (type, price, description, total, room_left) VALUES ('%s', %.2f, '%s', %d, %d);" % (
                room["type"].replace("'", "''"), 
                float(room["price"]), 
                room["description"].replace("'", "''"), 
                total,  # Set total
                total   # Set left = total
            )
        )


# Insert `admins` from .env if the table is empty
if table_is_empty("admins"):
    admin_count = 1
    while True:
        email_key = "ADMIN%d_EMAIL" % admin_count
        pwd_key = "ADMIN%d_PWD" % admin_count

        email = os.environ.get(email_key)
        password = os.environ.get(pwd_key)

        if email and password:
            hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())

            sql_statements.append(
                "INSERT INTO admins (email, password_hash) VALUES ('%s', '%s');" % (
                    email.replace("'", "''"), hashed_password
                )
            )
        else:
            break
        admin_count += 1

# Close MySQL connection
cursor.close()
conn.close()

# Save SQL statements to file if there are new inserts
if sql_statements:
    sql_script = "\n".join(sql_statements)
    with open(SQL_PATH, "wb") as sql_file:
        sql_file.write(sql_script)

    print "SQL script generated successfully: %s" % SQL_PATH

    # Run MySQL command automatically
    mysql_command = "mysql -u %s -p%s %s < %s" % (DB_USER, DB_PASSWORD, DB_NAME, SQL_PATH)
    print "Running:", mysql_command
    os.system(mysql_command)

    print "✅ Database updated successfully!"
else:
    print "No new data to insert. Database is already up to date."
