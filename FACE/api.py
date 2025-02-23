from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import imagehash
from face_verifier import compare
from metadata import compare_location_images,compare_time_images
def hashimg(path):
    return imagehash.phash(Image.open(path))


app2 = FastAPI()
origins = [
    "http://192.168.40.74:8000",
    "https://localhost.tiangolo.com",
    "http://localhost:5173",
    "http://localhost:8080",
]

app2.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app2.get("/")
async def main():
    return {"message": "Hello World"}
@app2.post("/compare")
async def upload_image(
    image1: UploadFile = File(...), 
    image2:UploadFile=File(...), 
):
    try:
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
        
        if (score>91.00 and imghash1 !=imghash2):
            return JSONResponse(content={
                "match": True,
                "exact_same_image":False,
                "location":check_loc,
                "time":check_time
            })
        elif(score>91.00 and imghash1 ==imghash2):
            return JSONResponse(content={
                "match": False,
                "exact_same_image":True,
                "location":check_loc,
                "time":check_time
            })
        else:
            return JSONResponse(content={
                "match": False,
                "exact_same_image":False,                
                "location":check_loc,
                "time":check_time
            })
             
    
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

