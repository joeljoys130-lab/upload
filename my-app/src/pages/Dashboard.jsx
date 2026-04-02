import React, { useEffect, useState } from "react";
import api from "../api/api";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const res = await api.get("/posts");
    setPosts(res.data);
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {posts.map((post) => (
        <div key={post._id} style={{ marginBottom: "20px" }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>

          {/* Show image if exists */}
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={`Cover for ${post.title}`}
              style={{ width: "300px" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;