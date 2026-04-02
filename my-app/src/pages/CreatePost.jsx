import React, { useState } from "react";
import ImageUpload from "../components/ImageUpload";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState(null);

  const [message, setMessage] = useState("");

  // Handle image upload (mock)
  const handleUpload = (formData) => {
    const file = formData.get("image");

    console.log("Image selected:", file);

    // temporary preview URL (mock upload)
    const imageUrl = URL.createObjectURL(file);
    setCoverImageUrl(imageUrl);

    setMessage("Image ready!");
  };

  // Handle post creation
  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      setMessage("Creating post...");

      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          coverImage: coverImageUrl,
        }),
      });

      const data = await res.json();

      console.log("Post created:", data);

      setMessage("Post created successfully!");

      // reset form
      setTitle("");
      setContent("");
      setCoverImageUrl(null);

    } catch (err) {
      console.error(err);
      setMessage("Post creation failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Create Post</h2>

      <form onSubmit={handlePostSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <br />

        <ImageUpload onUpload={handleUpload} />

        {coverImageUrl && (
          <img
            src={coverImageUrl}
            alt="Preview"
            style={{ width: "200px", marginTop: "10px" }}
          />
        )}

        <br />

        <button type="submit">Create Post</button>
      </form>

      {message && (
        <p style={{ marginTop: "15px", color: "lightgreen" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default CreatePost;