import React from "react";
import Header from "../components/Header/Header";
import Logout from "../components/Logout/Logout";
//import Posts from "../components/Posts/Posts";
import SendPost from "../components/SendPost/SendPost";

// Page d'affichage et de création des posts

const CreatePost = () => {
  return (
    <div className="posts-page_ctn">
      <Header profileTab={true} />
      <div>
        <Logout />
      </div>
      <div className="posts_ctn">
        <SendPost />
        <h2 className="posts-news_ctn">Nouveaux posts</h2>
        {/* <Posts /> */}
      </div>
    </div>
  );
};

export default CreatePost;
