import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ToLikeUnlike = ({ postId }) => {
  const [LikesNbs, upLikesNbs] = useState(0);

  // Modification du nombe de likes dans la bdd et rechage de la page
  const modifLikes = () => {
    const data = {
      userId: JSON.parse(localStorage.getItem("user")).user_id,
      postId: postId,
    };

    axios.patch("http://localhost:3000/api/post/:id/likeUnlike", data);
    document.location.reload();
  };

  // Récupération du nombre de likes dans la bdd
  useEffect(() => {
    const getLikesNb = () => {
      axios
        .post("http://localhost:3000/api/post/:id/likes", { postId })
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
      <div className="to-like-unlike__likes-count">
        <FontAwesomeIcon icon={faThumbsUp} color={"grey"} />
        <p className="to-like-unlike__likes-count__number">{LikesNbs}</p>
      </div>
      <hr />
      <div className="to-like-unlike__button">
        <button className="button__liked" onClick={modifLikes}>
          <span>
            <FontAwesomeIcon icon={faThumbsUp} />
          </span>
          Like
        </button>
      </div>
      <hr />
    </div>
  );
};

export default ToLikeUnlike;
