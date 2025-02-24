import ollama
from PIL import Image
import base64
import io

def encode_image(image_path):
    """
    Encode image to base64 string
    """
    with Image.open(image_path) as img:
        # Convert image to RGB if it's not
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Convert to JPEG format in memory
        buffered = io.BytesIO()
        img.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode()
        return img_str

def check_image_text_similarity(image_path, text, model="llava"):
    """
    Check if text is related to image using Ollama
    
    Args:
        image_path (str): Path to the image file
        text (str): Text to compare with image
        model (str): Ollama model to use (default: llava)
    
    Returns:
        dict: Response containing similarity assessment
    """
    try:
        # Encode image
        base64_image = encode_image(image_path)
        
        # Prepare the prompt
        prompt = f"""
        Analyze this image and determine if it's related to the following text: "{text}"
        Please respond with:
        1. Whether the text matches the image content (yes/no)
        2. A brief explanation of why
        3. A confidence score (0-100%)
        """
        
        # Generate response using ollama
        response = ollama.generate(
            model=model,
            prompt=prompt,
            images=[base64_image]
        )
        
        return parse_response(response)
        
    except Exception as e:
        return {"error": f"Failed to process request: {str(e)}"}

def parse_response(response):
    """
    Parse and format the Ollama response
    """
    try:
        result = {
            "raw_response": response.get("response", ""),
            "is_related": None,
            "explanation": "",
            "confidence": 0
        }
        
        # Parse the response text
        text = response.get("response", "").lower()
        
        # Determine if related
        if "yes" in text:
            result["is_related"] = True
        elif "no" in text:
            result["is_related"] = False
            
        # Extract confidence score
        import re
        confidence_match = re.search(r'(\d+)%', text)
        if confidence_match:
            result["confidence"] = int(confidence_match.group(1))
            
        # Extract explanation
        result["explanation"] = text
            
        return result
        
    except Exception as e:
        return {"error": f"Failed to parse response: {str(e)}"}

# Example usage
def check(path:str,t:str):
    image_path = path
    text = t
    
    print("Checking image-text similarity...")
    result = check_image_text_similarity(image_path, text)
    
    if "error" in result:
        print(f"Error: {result['error']}")
        return result
    else:
        print(f"\nResults:")
        print(f"Related: {result['is_related']}")
        print(f"Confidence: {result['confidence']}%")
        print(f"Explanation: {result['explanation']}")
        return result