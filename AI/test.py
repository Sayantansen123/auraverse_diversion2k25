import cv2
import pytesseract
import re
import numpy as np
from fuzzywuzzy import fuzz
from Levenshtein import ratio

# Set Tesseract path if needed (Windows users)
# pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def preprocess_image(image_path):
    """Preprocess image to improve OCR accuracy"""
    image = cv2.imread(image_path)
    
    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply adaptive thresholding to enhance text
    gray = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)

    # Apply a small blur to reduce noise
    gray = cv2.GaussianBlur(gray, (3, 3), 0)

    # Sharpen the image
    kernel = np.array([[0, -1, 0], [-1, 5,-1], [0, -1, 0]])
    gray = cv2.filter2D(gray, -1, kernel)

    return gray


def extract_text_from_image(image_path):
    """Extract text from an image using Tesseract OCR"""
    processed_image = preprocess_image(image_path)
    text = pytesseract.image_to_string(processed_image, config='--psm 4')  # Using PSM 6 for better recognition
    return text.strip()

def normalize_text(text):
    """Clean and normalize text for better comparison"""
    text = text.lower().strip()  # Convert to lowercase and remove extra spaces
    text = re.sub(r'[^a-zA-Z0-9 ]', '', text)  # Remove special characters
    return text


def calculate_similarity(text1, text2):
    """Calculate similarity using Levenshtein distance"""
    return ratio(text1, text2) * 100  # Convert to percentage

def verify_certificate(image_path, expected_name, expected_address):
    """Extract text and check similarity with expected credentials"""
    extracted_text = extract_text_from_image(image_path)
    lines = extracted_text.split("\n")  # Split into individual lines

    # Normalize extracted lines
    normalized_lines = [normalize_text(line) for line in lines]

    # Calculate similarity for each line
    name_match = max([calculate_similarity(normalize_text(expected_name), line) for line in normalized_lines])
    address_match = max([calculate_similarity(normalize_text(expected_address), line) for line in normalized_lines])

    avg_match = (name_match + address_match) / 2  # Average match percentage

    return {
        "Extracted Text": extracted_text,
        "Name Match %": round(name_match, 2),
        "Address Match %": round(address_match, 2),
        "Overall Match %": round(avg_match, 2)
    }

if __name__ == "__main__":
    # Change this to your certificate image file
    certificate_image = "img.png"  

    # Expected credentials to verify
    expected_name = "Shreedeepati Datta"
    expected_address = "123 Main Street, New York, USA"

    # Run verification
    result = verify_certificate(certificate_image, expected_name, expected_address)

    # Print results
    print("\nExtracted Text:\n", result["Extracted Text"])
    print(f"\nName Match: {result['Name Match %']}%")
    print(f"Address Match: {result['Address Match %']}%")
    print(f"Overall Match: {result['Overall Match %']}%")
