import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Result.css";
import diseaseInfo from "../data/diseaseInfo";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const result = state?.result;
  const preview = state?.preview;

  const info =
  diseaseInfo[result?.disease] || {
    description: "No information available.",
    risk: "Unknown",
    symptoms: "N/A",
    recommendation: "Consult a dermatologist."
  };

  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScanning(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!result) {
    return (
      <div className="empty-state">
        <h2>No analysis found</h2>

        <button onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="result-page">

      <div className="hero-section">
        <h1>AI Skin Disease Screening</h1>

        <p>
          Upload an image of the skin lesion and our AI model will analyze it.
        </p>

        <div className="gradient-line"></div>
      </div>

      <div className="main-layout">

        {/* Upload Card */}
        <div className="glass-card upload-card">

          <h3>Upload Image</h3>

          <div className="upload-placeholder">
            <div className="upload-icon">☁️</div>

            <p>Image Uploaded Successfully</p>
          </div>

          <button
            className="predict-btn-result"
            onClick={() => navigate("/")}
          >
            New Scan
          </button>

        </div>

        {/* Preview Card */}
        <div className="glass-card preview-card">

          <h3>Preview</h3>

          <div className="scan-wrapper">

            <img src={preview} alt="Skin Preview" />

            {scanning && (
              <div className="scanner-overlay">

                <div className="scan-line"></div>

                <div className="scan-glow"></div>

                <div className="scan-text">
                  AI Scanning...
                </div>

              </div>
            )}

          </div>

        </div>

        {/* Prediction Card */}

        <div className="glass-card prediction-panel">

          <h3>Prediction Result</h3>

          <h2>{result.disease}</h2>

          <div className="confidence-pill">
            Confidence: {result.confidence}%
          </div>

          <div className="success-card">

            <h4>
              This appears to be a benign lesion.
            </h4>

            <p>
              Continue monitoring for any changes.
            </p>

          </div>

        </div>

        {/* Disease Information */}

        <div className="info-panel">

          <h3>Disease Information</h3>

          <div className="info-grid">

            <div className="info-card">
              <h4>Description</h4>

              <p>
                {info.description}
              </p>
            </div>

            <div className="info-card">
              <h4>Risk Level</h4>

              <p
                className={
                  info.risk === "High Risk"
                    ? "risk-high"
                    : info.risk === "Medium Risk"
                    ? "risk-medium"
                    : "risk-low"
                }
              >
                {info.risk}
              </p>
            </div>

            <div className="info-card">
              <h4>Symptoms</h4>

              <p>
                {info.symptoms}
              </p>
            </div>

            <div className="info-card">
              <h4>Recommendation</h4>

              <p>
                {info.recommendation}
              </p>
            </div>

          </div>

        </div>

      </div>

      <div className="disclaimer">
        Disclaimer: This tool is for educational purposes only and is not a substitute for professional medical advice.
      </div>

    </div>
  );
}