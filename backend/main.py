from fastapi import FastAPI
from fastapi import UploadFile
from fastapi import File

from fastapi.middleware.cors import CORSMiddleware

import shutil
import os

from predict import predict_image

app = FastAPI(
    title="AI Skin Disease Screening"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

os.makedirs("uploads", exist_ok=True)


@app.get("/")
def home():

    return {
        "message": "AI Skin Disease Screening Running"
    }


@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):

    file_path = f"uploads/{file.filename}"

    with open(
        file_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    result = predict_image(
        file_path
    )

    return result