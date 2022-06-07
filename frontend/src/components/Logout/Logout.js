import React from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

// Bouton de déconnexion avec affichage du nom de l'utilisateur

const Logout = () => {
  const logoutClick = async () => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    await axios.get("http://localhost:3001/api/auth/logout", {
      withCredentials: true,
      headers: { authorization: `Bearer ${token}` },
    });
    localStorage.clear();
    window.location.href = "http://localhost:3000/";
  };

  return (
    <div onClick={logoutClick} className="logout_ctn">
      <div className="user-name-profil">
        {/* <p>Bonjour {userName} (userName) !</p> */}
        <p>Bonjour !</p>
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
