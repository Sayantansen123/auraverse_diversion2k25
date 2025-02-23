from fastapi import FastAPI, File, UploadFile, Form
import cloudinary.uploader
from fastapi.responses import JSONResponse
from t import check
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import imagehash

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


@app.get("/")
async def main():
    return {"message": "Hello World"}
@app.post("/upload")
async def upload_image(
    image: UploadFile = File(...), 
    text: str = Form(...), 
):
    try:
        # Read the file content
        contents = await image.read()
        with open(f"uploads/{image.filename}", "wb") as f:
            f.write(contents)
        
        result=check(f"uploads/{image.filename}",text)
        hashed_image=hashimg(f"uploads/{image.filename}")

        cloudinary.config(
            cloud_name="dnyoswxlm",
            api_key="186388281882135",
            api_secret="y-RCvi5R2U-GlOBR6XCWdiRW7Wo"
        )
        # Upload to Cloudinary
        upload_result = cloudinary.uploader.upload(contents, folder="my_uploads")

        # Get the Cloudinary URL
        image_url = upload_result.get("secure_url")

        return JSONResponse(content={
            "image_url": image_url,
            "text": text,
            "similarity": result['is_related'],
            "hash":str(hashed_image)
        })
    
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

