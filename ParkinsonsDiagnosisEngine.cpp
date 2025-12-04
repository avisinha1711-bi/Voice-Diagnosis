#include <iostream>
#include <vector>
#include <string>
#include <cmath>
#include <iomanip>
#include <numeric>

// --- Configuration Constants ---
// These are typical feature thresholds found in PD voice studies.
const double THRESHOLD_JITTER = 0.005; // Jitter > 0.005 is often considered high risk
const double THRESHOLD_SHIMMER = 0.05;  // Shimmer > 0.05 is often considered high risk
const double THRESHOLD_HNR = 20.0;    // HNR < 20 dB is often considered high risk

/**
 * @struct VoiceFeatures
 * @brief Holds the extracted acoustic features from a patient's voice sample.
 * * In a real application, these features would be computed by a DSP library
 * after recording a sustained vowel sound (like 'aah').
 */
struct VoiceFeatures {
    double jitter;      // Cycle-to-cycle variation in pitch frequency
    double shimmer;     // Cycle-to-cycle variation in pitch amplitude
    double hnr;         // Harmonics-to-Noise Ratio (measure of vocal quality)
    double f0_mean;     // Mean Fundamental Frequency (pitch)
    // ... potentially dozens more features
};

/**
 * @class ParkinsonsDiagnosisEngine
 * @brief Manages the feature processing and diagnostic risk assessment.
 * * This class conceptually represents the link between the audio processing
 * and the final machine learning prediction.
 */
class ParkinsonsDiagnosisEngine {
private:
    // In a real application, a trained ML model would be loaded here.
    // E.g., a TensorFlow Lite model or a set of learned coefficients (weights/biases).
    // For this conceptual example, we use a rule-based risk score.

    /**
     * @brief Converts a risk score (0-100) into a textual assessment.
     * @param risk_score The calculated risk percentage.
     * @return A string representing the risk level.
     */
    std::string get_risk_level(double risk_score) const {
        if (risk_score >= 80) return "High Risk";
        if (risk_score >= 50) return "Moderate Risk";
        return "Low Risk";
    }

public:
    /**
     * @brief The main diagnostic function, simulating a prediction.
     * * In a production environment, this function would pass the VoiceFeatures
     * directly into the loaded Machine Learning model (e.g., SVM).
     * * @param features The extracted VoiceFeatures structure.
     * @return A pair containing the diagnosis text and the risk score (0-100).
     */
    std::pair<std::string, double> run_diagnosis(const VoiceFeatures& features) const {
        std::cout << std::fixed << std::setprecision(4);
        std::cout << "\n--- Analyzing Features ---\n";
        std::cout << "Jitter:  " << features.jitter << " (Threshold: " << THRESHOLD_JITTER << ")\n";
        std::cout << "Shimmer: " << features.shimmer << " (Threshold: " << THRESHOLD_SHIMMER << ")\n";
        std::cout << "HNR:     " << features.hnr << " (Threshold: " << THRESHOLD_HNR << ")\n";
        std::cout << "--------------------------\n";

        // --- CONCEPTUAL RISK SCORING (Rule-Based Proxy for ML) ---
        // We assign risk points based on deviations from typical healthy values.
        int risk_points = 0;

        // Jitter (Higher is worse)
        if (features.jitter > THRESHOLD_JITTER) {
            risk_points += 40;
        } else if (features.jitter > THRESHOLD_JITTER * 0.75) {
            risk_points += 20;
        }

        // Shimmer (Higher is worse)
        if (features.shimmer > THRESHOLD_SHIMMER) {
            risk_points += 30;
        } else if (features.shimmer > THRESHOLD_SHIMMER * 0.75) {
            risk_points += 15;
        }

        // HNR (Lower is worse)
        if (features.hnr < THRESHOLD_HNR) {
            risk_points += 30;
        } else if (features.hnr < THRESHOLD_HNR * 1.25) {
            risk_points += 15;
        }

        // Clamp the score between 0 and 100
        double risk_score = std::min(100.0, (double)risk_points);

        std::string diagnosis_text = "Vocal Feature Assessment: " + get_risk_level(risk_score);
        
        return {diagnosis_text, risk_score};
    }
};

/**
 * @brief Main function to run the C++ demonstration.
 */
int main() {
    std::cout << "===== Parkinson's Voice Assisted Diagnosis Software (C++ Engine) =====\n";

    ParkinsonsDiagnosisEngine engine;

    // --- CASE 1: High Risk Profile (Features typical of PD) ---
    VoiceFeatures case1 = {
        0.0085,  // High Jitter
        0.065,   // High Shimmer
        15.5,    // Low HNR
        120.5    // Pitch
    };
    std::pair<std::string, double> result1 = engine.run_diagnosis(case1);
    std::cout << "\n[Case 1: Patient Voice Sample (PD-like)]\n";
    std::cout << "Diagnosis Result: " << result1.first << "\n";
    std::cout << "Calculated Risk Score: " << std::round(result1.second) << "%\n";
    std::cout << "----------------------------------------------------------------------\n";


    // --- CASE 2: Low Risk Profile (Features typical of Healthy Controls) ---
    VoiceFeatures case2 = {
        0.0021,  // Low Jitter
        0.028,   // Low Shimmer
        28.1,    // High HNR
        155.2    // Pitch
    };
    std::pair<std::string, double> result2 = engine.run_diagnosis(case2);
    std::cout << "\n[Case 2: Patient Voice Sample (Healthy-like)]\n";
    std::cout << "Diagnosis Result: " << result2.first << "\n";
    std::cout << "Calculated Risk Score: " << std::round(result2.second) << "%\n";
    std::cout << "----------------------------------------------------------------------\n";

    return 0;
}
