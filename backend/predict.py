import numpy as np
import tensorflow as tf
import cv2

from labels import IDX_TO_LABEL

MODEL_PATH = "model/skin_disease_model.h5"

model = tf.keras.models.load_model(MODEL_PATH)

IMG_SIZE = 224


def predict_image(image_path):

    image = cv2.imread(image_path)

    image = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2RGB
    )

    image = cv2.resize(
        image,
        (IMG_SIZE, IMG_SIZE)
    )

    image = image / 255.0

    image = np.expand_dims(
        image,
        axis=0
    )

    predictions = model.predict(
        image,
        verbose=0
    )

    predicted_class = np.argmax(
        predictions
    )

    confidence = float(
        np.max(predictions)
    )

    disease = IDX_TO_LABEL[
        predicted_class
    ]
    '''
    return {
        "disease": disease,
        "confidence": round(
            confidence * 100,
            2
        )
    }
    '''
    
    confidence_percent = round(confidence * 100, 2)

    if confidence_percent < 80:
        return {
            "error": "Invalid skin lesion image. Please upload a clear skin disease image."
        }

    return {
            "disease": disease,
            "confidence": confidence_percent
    }