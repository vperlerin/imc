#python python/create_db.py
#mysql -u imc2025 -p imc2025 < build/insert_data.sql 
import json
import os

# Define paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  
JSON_PATH = os.path.join(BASE_DIR, "src", "data", "conference-data.json")   
SQL_PATH = os.path.join(BASE_DIR, "python", "insert_data.sql")   

# Load JSON file
with open(JSON_PATH, "r", encoding="utf-8") as file:
    data = json.load(file)

# Extract workshops (Fixed)
workshop_inserts = [
    f"INSERT INTO workshops (title, price) VALUES ('{workshop['title']}', {workshop['cost']});"
    for workshop in data['workshops']  
]

# Extract registration types (Fixed)
registration_inserts = [
    f"INSERT INTO registration_types (type, price, description) VALUES "
    f"('{room['type']}', {room['price']}, '{room['description']}');"
    for room in data['costs']['rooms']
]

# Extract T-shirt sizes & pricing (Fixed)
tshirt_price = data['costs']['tshirts']['price']
tshirt_sizes = [
    f"INSERT INTO extra_options (participant_id, buy_tshirt, tshirt_size, tshirt_price) VALUES "
    f"(@participant_id, TRUE, '{model.capitalize()} {size}', {tshirt_price});"
    for model in data['costs']['tshirts']['models"]
    for size in data['costs']['tshirts']['sizes']
]

# Combine all SQL statements
sql_script = "\n".join(workshop_inserts + registration_inserts + tshirt_sizes)

# Save to file
with open(SQL_PATH, "w", encoding="utf-8") as sql_file:
    sql_file.write(sql_script)

print(f"SQL script generated successfully: {SQL_PATH}")
