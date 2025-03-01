#!/bin/bash

ENV_FILE="../env/.env"

if [ ! -f "$ENV_FILE" ]; then
    echo "Error: .env file not found at $ENV_FILE!"
    exit 1
fi

# Load .env file safely, preserving spaces in values
export $(grep -v '^#' "$ENV_FILE" | xargs -d '\n')
 
TEMP_SQL="temp_create_db.sql"

echo ""
echo "$(tput setaf 1)⚠️ WARNING: THIS WILL DELETE THE DATABASE '$MYSQL_DATABASE' COMPLETELY!$(tput sgr0)"
echo "$(tput setaf 1)ALL DATA WILL BE LOST. THIS ACTION CANNOT BE UNDONE.$(tput sgr0)"
echo ""

read -p "Do you want to continue? (y/N): " confirm

confirm=${confirm,,}   

if [ "$confirm" != "y" ]; then
    echo "Operation canceled."
    exit 0
fi

cp create_db.sql "$TEMP_SQL"

# Replace placeholders with actual values from .env
sed -i "s/MYSQL_DATABASE/$MYSQL_DATABASE/g" "$TEMP_SQL"
sed -i "s/MYSQL_USER/$MYSQL_USER/g" "$TEMP_SQL"
sed -i "s/MYSQL_PASSWORD/$MYSQL_PASSWORD/g" "$TEMP_SQL"

# Execute the SQL script using the root user
mysql -u root -p < "$TEMP_SQL"

# Remove the temporary SQL file after execution
rm "$TEMP_SQL"

echo "✅ Database setup completed successfully! Time to run python fill_db.py"
