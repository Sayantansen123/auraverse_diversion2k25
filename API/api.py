import os
from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import imagehash
import cloudinary.uploader
from similarity import check
from face_verifier import compare
from metadata import compare_location_images,compare_time_images
from dotenv import load_dotenv

load_dotenv()

def hashimg(path):
    return imagehash.phash(Image.open(path))


app = FastAPI()
origins = [
    "http://192.168.40.74:8000",
    "https://localhost.tiangolo.com",
    "http://localhost:5173",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/upload")
async def upload_image(
    image: UploadFile = File(...), 
    text: str = Form(...), 
    image1: UploadFile = File(...), 
    image2:UploadFile=File(...),
):
    try:
        # Read the file content
        contents = await image.read()
        with open(f"uploads/{image.filename}", "wb") as f:
            f.write(contents)
        
        result=check(f"uploads/{image.filename}",text)
        hashed_image=hashimg(f"uploads/{image.filename}")

        cloudinary.config(
            cloud_name=os.getenv("CLOUD_NAME"),
            api_key=os.getenv("API_KEY"),
            api_secret=os.getenv("API_SECRET")
        )
        # Upload to Cloudinary
        upload_result = cloudinary.uploader.upload(contents, folder="my_uploads")

        # Get the Cloudinary URL
        image_url = upload_result.get("secure_url")

        img1 = await image1.read()
        with open(f"uploads/{image1.filename}", "wb") as f:
            f.write(img1)
        
        img2 = await image2.read()
        with open(f"uploads/{image2.filename}", "wb") as f:
            f.write(img2)

        score=compare(f"uploads/{image1.filename}",f"uploads/{image2.filename}")
        imghash1=hashimg(f"uploads/{image1.filename}")
        imghash2=hashimg(f"uploads/{image2.filename}")
        check_time=compare_time_images(f"uploads/{image1.filename}",f"uploads/{image2.filename}")
        check_loc=compare_location_images(f"uploads/{image1.filename}",f"uploads/{image2.filename}")
        match=None
        same_image=False
        if (score>91.00 and imghash1 !=imghash2):
            match=True
            same_image=False
        elif(score>91.00 and imghash1 ==imghash2):
            match=False
            same_image=True
        else:
            match=False
            same_image=False
             
        return JSONResponse(content={
            "image_url": image_url,
            "text": text,
            "similarity": result['is_related'],
            "hash":str(hashed_image),
            "match": match,
            "exact_same_image":same_image,                
            "location":check_loc,
            "time":check_time
        })
    
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

