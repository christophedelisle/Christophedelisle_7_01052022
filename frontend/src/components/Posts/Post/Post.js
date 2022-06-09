import React, { useState, useEffect } from "react";
import axios from "axios";
import PostAuthor from "./PostAuthor/PostAuthor";
import Text from "./Text/Text";
import File from "./File/File";
import ToLikeUnlike from "./ToLikeUnlike/ToLikeUnlike.js";
import Delete from "./Delete/Delete";

const Post = ({ post }) => {
  const [FileURL, upFileURL] = useState(null);
  const id = post.id;
  const { id: postId, author_firstname, author_lastname, message } = post;

  // recovery of the image corresponding to the post in the database

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    const catchFile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/post/image/${id}`,
          {
            withCredentials: true,
            headers: { authorization: `Bearer ${token}` },
          }
        );
        if (response.data.length > 0) {
          upFileURL(response.data[0].image_url);
        }
      } catch (err) {
        throw err;
      }
    };
    catchFile();
  }, [id]);

  // Deleting a post (the admin part is created in the backend)

  const handleClick = () => {
    const deletePost = async () => {
      const token = JSON.parse(localStorage.getItem("user")).token;

      axios
        .delete(`http://localhost:3001/api/post/${id}`, {
          withCredentials: true,
          headers: { authorization: `Bearer ${token}` },
        })
        .then((res, err) => {
          if (res.status === 200) document.location.reload();
          else if (res.status === 201)
            alert("Vous devez être Admin pour supprimer ce message !");
        });
    };
    deletePost();
  };

  return (
    <>
      <div className="post">
        <div className="post__author_ctn">
          <p>Posté par : </p>
          <PostAuthor
            className="post__author"
            author={`${author_firstname} ${author_lastname}`}
          />
        </div>
        {<Delete post={post} onClick={handleClick} />}
        <Text message={message} />
        {FileURL && <File FileURL={FileURL} />}
        <ToLikeUnlike postId={postId} />
      </div>
    </>
  );
};

export default Post;
