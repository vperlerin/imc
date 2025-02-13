#python python/fill_db.py
#mysql -u imc2025 -p imc2025 < python/insert_data.sql 
import json
import os

# Define paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  
JSON_PATH = os.path.join(BASE_DIR, "imc", "src", "data", "conference-data.json")   
SQL_PATH = os.path.join(BASE_DIR, "python", "insert_data.sql")   
ENV_PATH = os.path.join(BASE_DIR, "env", ".env")   

# Load environment variables
if os.path.exists(ENV_PATH):
    with open(ENV_PATH, "r") as env_file:
        for line in env_file:
            if line.strip() and not line.startswith("#"):
                key, value = line.strip().split("=", 1)
                os.environ[key] = value

# Load JSON file
with open(JSON_PATH, "r") as file:   
    data = json.load(file)

# Extract workshops
workshop_inserts = [
    "INSERT INTO workshops (title, price) VALUES ('{title}', {cost});".format(
        title=workshop["title"], cost=workshop["cost"]
    )
    for workshop in data["workshops"]
]

# Extract registration types (rooms)
registration_inserts = [
    "INSERT INTO registration_types (type, price, description) VALUES ('{type}', {price}, '{description}');".format(
        type=room["type"], price=room["price"], description=room["description"]
    )
    for room in data["costs"]["rooms"]
]

# Extract admin users from .env
admin_inserts = []
for i in range(1, 3):  # Support for ADMIN1 and ADMIN2
    email_key = "ADMIN{}_EMAIL".format(i)
    pwd_key = "ADMIN{}_PWD".format(i)

    email = os.environ.get(email_key)
    password = os.environ.get(pwd_key)

    if email and password:
        admin_inserts.append(
            "INSERT INTO admins (email, password_hash) VALUES ('{email}', '{password}');".format(
                email=email, password=password
            )
        )

# Combine all SQL statements
sql_script = "\n".join(workshop_inserts + registration_inserts + admin_inserts)

# Save to file
with open(SQL_PATH, "w") as sql_file:
    sql_file.write(sql_script)

print("SQL script generated successfully: {}".format(SQL_PATH))
print("RUN mysql -u imc2025 -p imc2025 < python/insert_data.sql ")
