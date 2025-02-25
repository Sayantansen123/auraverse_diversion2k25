import dlib
import cv2
import numpy as np

# Load pre-trained face recognition model
face_detector = dlib.get_frontal_face_detector()
face_recognizer = dlib.face_recognition_model_v1("dlib_face_recognition_resnet_model_v1.dat")
shape_predictor = dlib.shape_predictor("shape_predictor_68_face_landmarks.dat")

def get_face_embedding(image_path):
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    faces = face_detector(gray)
    if len(faces) == 0:
        raise ValueError("No face detected!")

    shape = shape_predictor(gray, faces[0])
    face_embedding = np.array(face_recognizer.compute_face_descriptor(img, shape))

    return face_embedding

# Compute embeddings for both images
def compare(img1:str,img2:str):
    embedding1 = get_face_embedding(img1)
    embedding2 = get_face_embedding(img2)

    # Compute cosine similarity
    cosine_similarity = np.dot(embedding1, embedding2) / (np.linalg.norm(embedding1) * np.linalg.norm(embedding2))

    print(f"Face similarity score: {cosine_similarity*100}")
    return cosine_similarity*100
