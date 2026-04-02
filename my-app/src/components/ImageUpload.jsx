import React, { useState, useEffect } from "react";

const ImageUpload = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");

  const validateFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      return "Please select a valid image (jpeg, png, webp, gif)";
    }

    if (file.size > maxSize) {
      return `File too large. Max 5MB. Your file: ${(file.size / (1024 * 1024)).toFixed(2)}MB`;
    }

    return null;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validationError = validateFile(file);

    if (validationError) {
      setError(validationError);
      setSelectedFile(null);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const newPreview = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreviewUrl(newPreview);
    setError("");
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    onUpload(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {previewUrl && !error && (
        <div style={{ marginTop: "10px" }}>
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      )}

      <button type="submit" disabled={!selectedFile || error}>
        Upload
      </button>
    </form>
  );
};

export default ImageUpload;