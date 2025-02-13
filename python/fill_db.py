#python python/fill_db.py
#mysql -u imc2025 -p imc2025 < python/insert_data.sql 
import json
import os

# Define paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  
JSON_PATH = os.path.join(BASE_DIR, "imc", "src", "data", "conference-data.json")   
SQL_PATH = os.path.join(BASE_DIR, "python", "insert_data.sql")   

# Load JSON file - note if python 3 is installed on day use
#  with open(JSON_PATH, "r", encoding="utf-8") as file:
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

# Combine all SQL statements
sql_script = "\n".join(workshop_inserts + registration_inserts)

# Save to file
with open(SQL_PATH, "w") as sql_file:
    sql_file.write(sql_script)

print("SQL script generated successfully: {}".format(SQL_PATH))
