from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

model = joblib.load("model.pkl")

# ✅ ADD THIS
@app.route("/")
def home():
    return "AQI Prediction API is running!"

# Existing route
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    features = np.array([[ 
        data["pm25"],
        data["pm10"],
        data["co"],
        data["no2"]
    ]])

    prediction = model.predict(features)[0]

    return jsonify({
        "predicted_aqi": round(prediction)
    })

if __name__ == "__main__":
    app.run(port=5000)