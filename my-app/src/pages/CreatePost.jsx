import React, { useState } from "react";
import ImageUpload from "../components/ImageUpload";

const CreatePost = () => {
  const [message, setMessage] = useState("");

  const handleUpload = (formData) => {
    const file = formData.get("image");

    console.log("Uploaded file:", file);

    // Show on UI instead of alert
    setMessage(`File ready: ${file.name}`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Create Post</h2>

      <ImageUpload onUpload={handleUpload} />

      {message && (
        <p style={{ marginTop: "15px", color: "lightgreen" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default CreatePost;
// file upload feature completed