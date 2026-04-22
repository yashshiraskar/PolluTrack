import pandas as pd
import json
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

# Load dataset
with open("data.json") as f:
    data = json.load(f)

df = pd.DataFrame(data)

# Features and target
X = df[["pm25", "pm10", "co", "no2"]]
y = df["aqi"]

# Split (optional but good practice)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# 🔥 Random Forest Model
model = RandomForestRegressor(
    n_estimators=100,   # number of trees
    random_state=42
)

# Train
model.fit(X_train, y_train)

# Save model
joblib.dump(model, "model.pkl")

print("✅ Random Forest model trained and saved!")
