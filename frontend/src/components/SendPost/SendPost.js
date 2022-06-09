import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";

// Area for creating new posts

const SendPost = () => {
  const [textPostValue, upTextPostValue] = useState("");

  const inputHandler = (e) => {
    upTextPostValue(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const post = new FormData();
    post.append(
      "author_firstname",
      JSON.parse(localStorage.getItem("user")).user.user_firstname
    );
    post.append(
      "author_lastname",
      JSON.parse(localStorage.getItem("user")).user.user_lastname
    );
    post.append(
      "user_id",
      JSON.parse(localStorage.getItem("user")).user.user_id
    );
    post.append("message", textPostValue);
    post.append("post_image", document.getElementById("post_image").files[0]);

    const token = JSON.parse(localStorage.getItem("user")).token;
    await axios.post("http://localhost:3001/api/post", post, {
      withCredentials: true,
      headers: { authorization: `Bearer ${token}` },
    });
    document.location.reload();
  };

  return (
    <div className="post-send_ctn">
      <form
        className="post-send-form_ctn"
        onSubmit={submitHandler}
        encType="multipart/form-data"
      >
        <input
          className="text"
          type="text"
          required
          placeholder="Exprimez-vous !"
          value={textPostValue}
          onChange={inputHandler}
        />
        <div className="file_ctn">
          <input
            type="file"
            name="post_image"
            id="post_image"
            className="container_add_file"
          />
          <button type="submit" className="submit_ctn">
            <FontAwesomeIcon icon={faShare} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendPost;
