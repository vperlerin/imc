#!/bin/bash

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
        echo "Source directory does not exist: $SRC"
        exit 1
    fi

    # Ensure the destination directory exists
    mkdir -p "$DEST"

    echo "Moving files from $SRC to $DEST..."
    mv "$SRC"/* "$DEST"/
    echo "Move completed: $SRC to $DEST"
}

# Move Python files
move_files "$PYTHON_SRC" "$PYTHON_DEST"

# Move MySQL files
move_files "$MYSQL_SRC" "$MYSQL_DEST"

# Move PHP files
move_files "$PHP_SRC" "$PHP_DEST"


# Delete all files under /build
if [ -d "$BUILD_DEST" ]; then
    echo "Deleting all files under $BUILD_DEST..."
    rm -rf "$BUILD_DEST"/*
    echo "All files in $BUILD_DEST deleted."
    echo ""
    echo ""
fi
 
# Move Build files
move_files "$BUILD_SRC" "$BUILD_DEST"

# Confirm completion
echo "All operations completed successfully."
