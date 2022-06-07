import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

//const token = JSON.parse(localStorage.getItem("user")).token;

const ToLikeUnlike = ({ postId }) => {
  const [LikesNbs, upLikesNbs] = useState(0);

  // Modification du nombe de likes dans la bdd et rechage de la page
  const modifLikes = () => {
    const data = {
      userId: JSON.parse(localStorage.getItem("user")).user.user_id,
      postId: postId,
    };
    const token = JSON.parse(localStorage.getItem("user")).token;
    axios.patch("http://localhost:3001/api/post/:id/likeUnlike", data, {
      withCredentials: true,
      headers: { authorization: `Bearer ${token}` },
    });
    document.location.reload();
  };

  // Récupération du nombre de likes dans la bdd
  useEffect(() => {
    const getLikesNb = () => {
      const token = JSON.parse(localStorage.getItem("user")).token;
      axios
        .post(
          "http://localhost:3001/api/post/:id/likes",
          { postId },
          {
            withCredentials: true,
            headers: { authorization: `Bearer ${token}` },
          }
        )
        .then((res, err) => {
          if (res.status === 200) {
            const LikesNbs = res.data[0].total;
            upLikesNbs(LikesNbs);
          }
          if (err) {
            throw err;
          }
        });
    };
    getLikesNb();
  }, [postId]);

  return (
    <div className="to-like-unlike">
      {/* <div className="to-like-unlike__likes-count">
        <FontAwesomeIcon icon={faThumbsUp} color={"grey"} />
        <p className="to-like-unlike__likes-count__number">{LikesNbs}</p>
      </div> */}

      <div className="to-like-unlike__button">
        <button className="button__liked" onClick={modifLikes}>
          <span>
            <FontAwesomeIcon icon={faThumbsUp} />
          </span>
          {LikesNbs}
        </button>
      </div>
    </div>
  );
};

export default ToLikeUnlike;
