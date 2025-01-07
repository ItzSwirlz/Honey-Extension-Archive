# Thank you ChatGPT
#!/bin/bash

# Base URL for the CDN
BASE_URL="http://v.joinhoney.com/recipe/stores"

# Directory to save the downloaded files
OUTPUT_DIR="downloads"

# Create the output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Loop through store IDs from 0 to 1000
for storeId in {0..1000}; do
    # Construct the URL for the current store ID
    URL="$BASE_URL/$storeId?full=true"
    
    # Output file name (store the response in separate files for each store ID)
    OUTPUT_FILE="$OUTPUT_DIR/store_$storeId.json"

    echo "Downloading $URL to $OUTPUT_FILE..."

    # Download the file using wget
    wget "$URL" -o "$OUTPUT_FILE"

    # Check if the download was successful
    if [ $? -eq 0 ]; then
        echo "Downloaded $URL successfully."
    else
        echo "Failed to download $URL."
    fi
done

echo "All downloads completed."

