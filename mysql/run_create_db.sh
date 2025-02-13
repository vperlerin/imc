#!/bin/bash

# Define the path to the .env file
ENV_FILE="/env/.env"

# Check if .env file exists
if [ -f "$ENV_FILE" ]; then
    export $(grep -v '^#' "$ENV_FILE" | xargs)
else
    echo "Error: .env file not found at $ENV_FILE!"
    exit 1
fi

# Create a temporary SQL file with replaced values
TEMP_SQL="temp_create_db.sql"
cp create_db.sql "$TEMP_SQL"

# Replace placeholders with actual values from .env
sed -i "s/MYSQL_DATABASE/$MYSQL_DATABASE/g" "$TEMP_SQL"
sed -i "s/MYSQL_USER/$MYSQL_USER/g" "$TEMP_SQL"
sed -i "s/MYSQL_PASSWORD/$MYSQL_PASSWORD/g" "$TEMP_SQL"

# Execute the SQL script using the root user
#mysql -u root -p < "$TEMP_SQL"

# Remove the temporary SQL file after execution
#rm "$TEMP_SQL"

echo "Database setup completed successfully!"
