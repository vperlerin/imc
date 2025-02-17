#python python/fill_db.py
#mysql -u imc2025 -p imc2025 < python/insert_data.sql 
import json
import os
import bcrypt

# Define paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JSON_PATH = os.path.join(BASE_DIR, "imc", "src", "data", "conference-data.json")
SQL_PATH = os.path.join(BASE_DIR, "python", "insert_data.sql")
ENV_PATH = os.path.join(BASE_DIR, "env", ".env")

# Load environment variables manually
if os.path.exists(ENV_PATH):
    with open(ENV_PATH, "rb") as env_file:  # 'rb' to avoid encoding issues
        for line in env_file:
            line = line.strip()
            if line and not line.startswith("#"):
                key, value = line.split("=", 1)
                os.environ[key] = value

# Load JSON file (Python 2 compatibility)
with open(JSON_PATH, "rb") as file:
    data = json.load(file)

# Extract workshops
workshop_inserts = [
    "INSERT INTO workshops (title, price) VALUES ('%s', %.2f);" % (
        workshop["title"].replace("'", "''"), float(workshop["cost"])
    )
    for workshop in data.get("workshops", [])
]

# Extract registration types (rooms)
registration_inserts = [
    "INSERT INTO registration_types (type, price, description) VALUES ('%s', %.2f, '%s');" % (
        room["type"].replace("'", "''"), float(room["price"]), room["description"].replace("'", "''")
    )
    for room in data.get("costs", {}).get("rooms", [])
]

# Extract admin users from .env with bcrypt hashing
admin_inserts = []
admin_count = 1

while True:
    email_key = "ADMIN%d_EMAIL" % admin_count
    pwd_key = "ADMIN%d_PWD" % admin_count

    email = os.environ.get(email_key)
    password = os.environ.get(pwd_key)

    if email and password:
        # Hash password securely
        hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())

        admin_inserts.append(
            "INSERT INTO admins (email, password_hash) VALUES ('%s', '%s');" % (
                email.replace("'", "''"), hashed_password
            )
        )
    else:
        break  # Stop when no more admin credentials are found

    admin_count += 1  # Move to next admin

# Combine all SQL statements
sql_script = "\n".join(workshop_inserts + registration_inserts + admin_inserts)

# Save to file
with open(SQL_PATH, "wb") as sql_file:  # 'wb' for binary mode in Python 2
    sql_file.write(sql_script)

print "SQL script generated successfully: %s" % SQL_PATH
print "RUN: mysql -u imc2025 -p imc2025 < python/insert_data.sql"
