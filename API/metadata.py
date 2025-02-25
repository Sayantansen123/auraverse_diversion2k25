from PIL import Image
import exifread
from datetime import datetime
from geopy.distance import geodesic

def get_metadata(image_path):
    """Extracts timestamp and GPS metadata from an image."""
    with open(image_path, 'rb') as f:
        tags = exifread.process_file(f, details=False)
    
    # Extract timestamp
    timestamp = tags.get("EXIF DateTimeOriginal")
    if timestamp:
        timestamp = datetime.strptime(str(timestamp), "%Y:%m:%d %H:%M:%S")
    
    # Extract GPS coordinates
    gps_latitude = tags.get("GPS GPSLatitude")
    gps_latitude_ref = tags.get("GPS GPSLatitudeRef")
    gps_longitude = tags.get("GPS GPSLongitude")
    gps_longitude_ref = tags.get("GPS GPSLongitudeRef")
    
    if gps_latitude and gps_longitude:
        lat = convert_to_degrees(gps_latitude)
        lon = convert_to_degrees(gps_longitude)
        
        if gps_latitude_ref.values[0] != 'N':
            lat = -lat
        if gps_longitude_ref.values[0] != 'E':
            lon = -lon
        
        gps_coords = (lat, lon)
    else:
        gps_coords = None
    
    return timestamp, gps_coords

def convert_to_degrees(value):
    """Helper function to convert GPS coordinates to degrees."""
    d, m, s = value.values
    return float(d) + (float(m) / 60.0) + (float(s) / 3600.0)

def compare_time_images(image1, image2, time_threshold=60):
    """Compares two images to check if they were taken close in time and location."""
    timestamp1, gps1 = get_metadata(image1)
    timestamp2, gps2 = get_metadata(image2)
    
    if not timestamp1 or not timestamp2:
        return None
    
    time_difference = abs((timestamp1 - timestamp2).total_seconds())
    
    if time_difference > time_threshold:
        return False
    return True
    
    

def compare_location_images(image1, image2, distance_threshold=0.1):

    """Compares two images to check if they were taken close in time and location."""
    timestamp1, gps1 = get_metadata(image1)
    timestamp2, gps2 = get_metadata(image2)

    if gps1 and gps2:
        distance = geodesic(gps1, gps2).kilometers
        if distance > distance_threshold:
            return False
    else:
        return None
    return True
    
