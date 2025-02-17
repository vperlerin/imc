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
    with open(ENV_PATH, "rb") as env_file:  # 'rb' for Python 2 compatibility
        for line in env_file:
            line = line.strip()
            if line and not line.startswith("#"):
                key, value = line.split("=", 1)
                os.environ[key] = value.decode("utf-8")  # Ensure UTF-8 compatibility

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

# Function to check if a table has data
def table_has_data(table_name):
    cursor.execute("SELECT COUNT(*) FROM %s" % table_name)
    count = cursor.fetchone()[0]
    return count > 0

# Load JSON data
with open(JSON_PATH, "rb") as file:
    data = json.load(file)

# SQL statement storage
sql_statements = []

# Insert imc_sessions if table is empty
if not table_has_data("imc_sessions"):
    for session in data.get("conferenceData", {}).get("sessions", []):
        sql_statements.append(
            "INSERT INTO imc_sessions (name) VALUES ('%s');" % session.replace("'", "''")
        )

# Close MySQL connection
cursor.close()
conn.close()

# Save SQL statements to file if there are new inserts
if sql_statements:
    sql_script = "\n".join(sql_statements)
    with open(SQL_PATH, "wb") as sql_file:  # 'wb' for binary mode in Python 2
        sql_file.write(sql_script)

    print "SQL script generated successfully: %s" % SQL_PATH

    # Run MySQL command automatically
    mysql_command = "mysql -u %s -p%s %s < %s" % (DB_USER, DB_PASSWORD, DB_NAME, SQL_PATH)
    print "Running:", mysql_command  # Print the command before execution
    os.system(mysql_command)

    print "✅ Database updated successfully!"
else:
    print "No new data to insert. Database is already up to date."
