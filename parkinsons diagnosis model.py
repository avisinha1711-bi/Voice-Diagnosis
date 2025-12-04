import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score
import warnings

# Suppress warnings for cleaner output
warnings.filterwarnings('ignore')

# --- 1. SIMULATE DATA GENERATION ---
# In a real application, these features (Jitter, Shimmer, HNR) would be extracted 
# from raw audio recordings using libraries like Librosa or Praat.
# High Jitter/Shimmer and Low HNR are characteristic of Parkinson's Disease (PD).

# Simulate 200 data points (features)
N = 200
np.random.seed(42)

# Healthy Control (Status = 0) - Lower Jitter/Shimmer, Higher HNR
healthy_jitter = np.random.uniform(0.001, 0.005, N // 2)
healthy_shimmer = np.random.uniform(0.01, 0.05, N // 2)
healthy_hnr = np.random.uniform(20, 30, N // 2)
healthy_status = np.zeros(N // 2)

# Parkinson's Patient (Status = 1) - Higher Jitter/Shimmer, Lower HNR
pd_jitter = np.random.uniform(0.005, 0.012, N // 2)
pd_shimmer = np.random.uniform(0.05, 0.1, N // 2)
pd_hnr = np.random.uniform(10, 20, N // 2)
pd_status = np.ones(N // 2)

# Combine data
X = np.column_stack([
    np.concatenate([healthy_jitter, pd_jitter]),
    np.concatenate([healthy_shimmer, pd_shimmer]),
    np.concatenate([healthy_hnr, pd_hnr])
])
y = np.concatenate([healthy_status, pd_status])

feature_names = ['Jitter (%)', 'Shimmer (dB)', 'HNR (Harmonics-to-Noise Ratio)']
data_df = pd.DataFrame(X, columns=feature_names)
data_df['Status'] = y.astype(int)

print("--- Simulated Parkinson's Voice Feature Data Sample ---")
print(data_df.head())
print("\n")


# --- 2. TRAIN THE CLASSIFICATION MODEL (Support Vector Classifier) ---
# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

# Initialize and train the SVM model
# SVC (Support Vector Classifier) is a powerful, commonly used algorithm for this type of binary classification
model = SVC(kernel='linear', random_state=42)
model.fit(X_train, y_train)

# Evaluate the model performance
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Training Complete. Test Accuracy: {accuracy:.2f}")
print("----------------------------------------------------------\n")


# --- 3. VOICE-ASSISTED DIAGNOSIS FUNCTION ---
def voice_assisted_diagnosis(jitter, shimmer, hnr, trained_model):
    """
    Predicts the health status (PD risk) based on acoustic features.
    
    Args:
        jitter (float): Cycle-to-cycle variation in pitch. (Higher in PD)
        shimmer (float): Cycle-to-cycle variation in amplitude. (Higher in PD)
        hnr (float): Harmonics-to-Noise Ratio. (Lower in PD)
        trained_model: The trained scikit-learn classification model.
        
    Returns:
        str: The diagnosis result.
    """
    # Create the feature vector for prediction
    new_features = np.array([[jitter, shimmer, hnr]])
    
    # Predict the status (0 = Healthy, 1 = Parkinson's)
    prediction = trained_model.predict(new_features)[0]
    
    # Predict probability (optional, but gives a risk score)
    # Note: SVC needs probability=True set on initialization for predict_proba, 
    # but we'll stick to direct prediction for simplicity here.
    
    if prediction == 1:
        return "Diagnosis: High Risk for Parkinson's Disease (PD) based on vocal features."
    else:
        return "Diagnosis: Low Risk for Parkinson's Disease (PD). Vocal features appear typical."

# --- 4. RUNNING DIAGNOSTIC SAMPLES ---

# Sample 1: Features suggesting PD (High Jitter, High Shimmer, Low HNR)
features_pd = (0.009, 0.08, 12.5)
print(f"Sample 1 Features: Jitter={features_pd[0]:.4f}, Shimmer={features_pd[1]:.2f}, HNR={features_pd[2]:.1f}")
result_pd = voice_assisted_diagnosis(*features_pd, model)
print(f"-> {result_pd}")

# Sample 2: Features suggesting Healthy (Low Jitter, Low Shimmer, High HNR)
features_healthy = (0.002, 0.03, 25.0)
print(f"\nSample 2 Features: Jitter={features_healthy[0]:.4f}, Shimmer={features_healthy[1]:.2f}, HNR={features_healthy[2]:.1f}")
result_healthy = voice_assisted_diagnosis(*features_healthy, model)
print(f"-> {result_healthy}")

# Sample 3: Borderline Case
features_borderline = (0.0055, 0.055, 18.0)
print(f"\nSample 3 Features: Jitter={features_borderline[0]:.4f}, Shimmer={features_borderline[1]:.2f}, HNR={features_borderline[2]:.1f}")
result_borderline = voice_assisted_diagnosis(*features_borderline, model)
print(f"-> {result_borderline}")

print("\nNOTE: This model is trained on simulated data. Real clinical results require a production-grade ML model trained on extensive patient datasets.")
