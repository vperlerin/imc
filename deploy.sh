#!/bin/bash

# Define color codes
RED='\e[31m'
GREEN='\e[32m'
YELLOW='\e[33m'
CYAN='\e[36m'
RESET='\e[0m'

# Load environment variables from .env
ENV_FILE="./env/.env"

if [ ! -f "$ENV_FILE" ]; then
    echo -e "${RED}Error: .env file not found at $ENV_FILE!${RESET}"
    exit 1
fi

# Load .env file safely (handles spaces and quotes)
while IFS='=' read -r key value; do
    if [[ ! "$key" =~ ^# && -n "$key" ]]; then
        export "$key"="$(echo "$value" | sed 's/^"\|"$//g')"  # Strip quotes if present
    fi
done < "$ENV_FILE"

# Ensure MYSQL_DATABASE is set
if [ -z "$MYSQL_DATABASE" ]; then
    echo -e "${RED}Error: MYSQL_DATABASE is not set in .env file!${RESET}"
    exit 1
fi

# Define source and destination directories using MYSQL_DATABASE from .env
BASE_PATH="/DATA/sites/$MYSQL_DATABASE.imo.net"

PYTHON_SRC="$BASE_PATH/imc/python"
PYTHON_DEST="$BASE_PATH/python"

MYSQL_SRC="$BASE_PATH/imc/mysql"
MYSQL_DEST="$BASE_PATH/mysql"

PHP_SRC="$BASE_PATH/imc/php"
PHP_DEST="$BASE_PATH/php"

BUILD_SRC="$BASE_PATH/imc/build"
BUILD_DEST="$BASE_PATH/build"

# Function to move files from source to destination
move_files() {
    local SRC=$1
    local DEST=$2

    # Ensure the source directory exists
    if [ ! -d "$SRC" ]; then
        echo -e "${RED}Error: Source directory does not exist: $SRC${RESET}"
        exit 1
    fi

    # Ensure the destination directory exists
    mkdir -p "$DEST"

    echo -e "${CYAN}Moving files from $SRC to $DEST...${RESET}"
    mv "$SRC"/* "$DEST"/
    echo -e "${GREEN}Move completed: $SRC to $DEST${RESET}"
    echo -e "${YELLOW}----------------------------------${RESET}"
}

# Move Python files
move_files "$PYTHON_SRC" "$PYTHON_DEST"

# Move MySQL files
move_files "$MYSQL_SRC" "$MYSQL_DEST"

# Move PHP files
move_files "$PHP_SRC" "$PHP_DEST"

# Ask for confirmation before deleting BUILD_DEST files
if [ -d "$BUILD_DEST" ]; then
    echo -e "${CYAN}⚠️ WARNING: This will DELETE all files in $BUILD_DEST!${RESET}"
    echo -e "${RED}⚠️ THIS ACTION CANNOT BE UNDONE.${RESET}"
    echo ""

    # Prompt user for confirmation
    read -p "Do you want to continue? (y/N): " confirm

    # Convert input to lowercase
    confirm=${confirm,,}  

    if [ "$confirm" == "y" ]; then
        echo -e "${CYAN}Deleting all files under $BUILD_DEST...${RESET}"
        rm -rf "$BUILD_DEST"/*
        echo -e "${GREEN}All files in $BUILD_DEST deleted.${RESET}"
        echo ""
    else
        echo -e "${YELLOW}Skipped deleting files in $BUILD_DEST.${RESET}"
    fi
fi

# Move Build files
move_files "$BUILD_SRC" "$BUILD_DEST"

# Confirm completion
echo -e "${GREEN}All operations completed successfully.${RESET}"
