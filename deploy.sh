#!/usr/bin/env bash

# Define color codes
RED='\e[31m'
GREEN='\e[32m'
YELLOW='\e[33m'
CYAN='\e[36m'
RESET='\e[0m'

# Get the script's directory (assumes it's inside /imc)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Set paths relative to /imc
OLD_ENV_FILE="$SCRIPT_DIR/env/.env"
NEW_ENV_FILE="$SCRIPT_DIR/../env/.env"
 
 
if [ -f "$OLD_ENV_FILE" ]; then
    echo -e "${CYAN}Found .env file at $OLD_ENV_FILE.${RESET}"
    echo -e "${YELLOW}Would you like to copy it to $NEW_ENV_FILE?${RESET}"
    read -p "Confirm copy? (y/N): " copy_confirm

    # Convert input to lowercase
    copy_confirm=${copy_confirm,,}

    if [ "$copy_confirm" == "y" ]; then
        # Ensure the destination directory exists
        mkdir -p "$(dirname "$NEW_ENV_FILE")"

        # Copy the file
        cp "$OLD_ENV_FILE" "$NEW_ENV_FILE"

        echo -e "${GREEN}.env file copied successfully!${RESET}"
    else
        echo -e "${YELLOW}Skipping copy of .env file.${RESET}"
    fi
fi

# Load environment variables from .env
ENV_FILE="$NEW_ENV_FILE"

if [ ! -f "$ENV_FILE" ]; then
    echo -e "${RED}Error: .env file not found at $ENV_FILE!${RESET}"
    exit 1
fi
 
# Load .env file safely, ignoring empty lines and invalid entries
while IFS='=' read -r key value || [[ -n "$key" ]]; do
    # Skip comments and empty lines
    if [[ -z "$key" || "$key" =~ ^# ]]; then
        continue
    fi

    # Trim whitespace from key and value
    key=$(echo "$key" | xargs)
    value=$(echo "$value" | xargs)

    # Ensure key is a valid identifier
    if [[ ! "$key" =~ ^[a-zA-Z_][a-zA-Z0-9_]*$ ]]; then
        echo -e "${YELLOW}⚠️ Warning: Invalid environment variable '$key' in .env file. Skipping...${RESET}"
        continue
    fi

    # Export variable, removing surrounding quotes
    export "$key"="${value//\"/}"
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

# Ensure rsync is installed
if ! command -v rsync &> /dev/null; then
    echo -e "${RED}Error: rsync is not installed. Please install it and try again.${RESET}"
    exit 1
fi

# Function to copy files and subdirectories while keeping structure
copy_files() {
    local SRC=$1
    local DEST=$2

    # Ensure the source directory exists
    if [ ! -d "$SRC" ]; then
        echo -e "${RED}Error: Source directory does not exist: $SRC${RESET}"
        return 1
    fi

    # Ensure the destination directory exists
    mkdir -p "$DEST"

    echo -e "${CYAN}Copying files and directories from $SRC to $DEST...${RESET}"

    # Use rsync to copy files, including subdirectories
    rsync -a "$SRC"/ "$DEST"/

    echo -e "${GREEN}Copy completed: $SRC to $DEST${RESET}"
    echo -e "${YELLOW}----------------------------------${RESET}"
}

# Copy Python files
copy_files "$PYTHON_SRC" "$PYTHON_DEST"

# Copy MySQL files
copy_files "$MYSQL_SRC" "$MYSQL_DEST"

# Copy PHP files
copy_files "$PHP_SRC" "$PHP_DEST"

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

# Copy Build files
copy_files "$BUILD_SRC" "$BUILD_DEST"

# Confirm completion
echo -e "${GREEN}All operations completed successfully.${RESET}"
