#!/bin/bash

# Define color codes
RED='\e[31m'
GREEN='\e[32m'
YELLOW='\e[33m'
CYAN='\e[36m'
RESET='\e[0m'

# Define source and destination directories
PYTHON_SRC="/DATA/sites/imc2025.imo.net/imc/python"
PYTHON_DEST="/DATA/sites/imc2025.imo.net/python"

MYSQL_SRC="/DATA/sites/imc2025.imo.net/imc/mysql"
MYSQL_DEST="/DATA/sites/imc2025.imo.net/mysql"

PHP_SRC="/DATA/sites/imc2025.imo.net/imc/php"
PHP_DEST="/DATA/sites/imc2025.imo.net/php"

BUILD_SRC="/DATA/sites/imc2025.imo.net/imc/build"
BUILD_DEST="/DATA/sites/imc2025.imo.net/build"

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

# Delete all files under /build before copying imc/build to /build
if [ -d "$BUILD_DEST" ]; then
    echo -e "${CYAN}Deleting all files under $BUILD_DEST...${RESET}"
    rm -rf "$BUILD_DEST"/*
    echo -e "${GREEN}All files in $BUILD_DEST deleted.${RESET}"
    echo ""
    echo ""
fi
 
# Move Build files
move_files "$BUILD_SRC" "$BUILD_DEST"

# Confirm completion
echo -e "${GREEN}All operations completed successfully.${RESET}"
