import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    setFile(selected);
  };

  const handlePredict = async () => {
    if (!file) {
      alert("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData
      );

      navigate("/result", {
        state: {
          result: response.data,
          preview: URL.createObjectURL(file),
        },
      });
    } catch (error) {
      console.error(error);
      alert("Prediction failed");
    }
  };

  return (
    <div className="app">
      <div className="landing-card">
        <h1>AI Skin Disease Screening</h1>

        <p className="subtitle">
          Upload a skin lesion image and let our AI model analyze possible skin
          conditions within seconds.
        </p>

        <div className="line"></div>

        <div className="upload-box">
          <div className="upload-icon">☁️</div>

          <h3>Upload Image</h3>

          <p>
            JPG, JPEG or PNG image
            <br />
            Maximum size: 10MB
          </p>

          <input type="file" onChange={handleFileChange} />
        </div>

        <button className="predict-btn" onClick={handlePredict}>
          Predict Disease
        </button>
      </div>
    </div>
  );
}