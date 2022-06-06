import React, { useState } from "react";

//import axios from "axios"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";

// Zone de création des nouveaux posts

const SendPost = () => {
  const [textPostValue, upTextPostValue] = useState("");

  const inputHandler = (e) => {
    upTextPostValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="post-send_ctn">
      <form
        className="post-send-form_ctn"
        onSubmit={submitHandler}
        method="post"
        // action="" ???
        encType="multipart/form-data"
      >
        <input
          className="text"
          type="text"
          required
          value={textPostValue}
          onChange={inputHandler}
        />
        <div className="file_ctn">
          <input
            type="file"
            name="post_image"
            id="post_image"
            className="icons_container_add_file"
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
