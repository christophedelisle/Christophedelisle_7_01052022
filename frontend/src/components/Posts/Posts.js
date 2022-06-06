import React, { useState, useEffect } from "react";
import Post from "./Post/Post";
import "./Posts";
import axios from "axios";

// Affichage des différents posts

const ShowPosts = () => {
  const [postsData, UpPostsData] = useState([]);
  const [showData, uPshowData] = useState(true);

  // useEffect ac tableau vide ??
  useEffect(() => {
    const getPosts = () => {
      axios.get("http://localhost:3000/api/post/").then((response) => {
        if (response.status === 200) {
          UpPostsData(response.data);
        } else {
          uPshowData(false);
        }
      });
    };
    getPosts();
  }, []);

  return (
    <div className="posts">
      {showData
        ? postsData.map((post) => {
            return <Post post={post} key={post.id} />;
          })
        : `Affichage impossible`}
    </div>
  );
};

export default ShowPosts;
