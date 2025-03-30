from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained XGBoost model
model = joblib.load("D:\\disaster-management\\python-files\\xgb_model.joblib")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        features = np.array(data["features"]).reshape(1, -1)
        prediction = model.predict(features)[0]
        return jsonify({"prediction": float(prediction)})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
