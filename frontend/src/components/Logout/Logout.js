import React from "react";
//import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

// Bouton de déconnexion avec affichage du nom de l'utilisateur

const logoutClick = () => {
  localStorage.clear();
  // axios.get("http://localhost:3000/api/auth/logout");
  window.location.href = "http://localhost:3000/";
};
//const userName = JSON.parse(localStorage.getItem("user")).user_firstname;

const Logout = () => {
  return (
    <div onClick={logoutClick} className="logout_ctn">
      <div className="user-name-profil">
        <p>Bonjour {/* {userName} */}(userName) !</p>
      </div>
      <span>
        {" "}
        <FontAwesomeIcon
          className="logout_ctn-icon"
          icon={faArrowRightFromBracket}
        />
        Se déconnecter
      </span>
    </div>
  );
};

export default Logout;
