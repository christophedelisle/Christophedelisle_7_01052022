import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

// Logout button

const Logout = () => {
  const navigate = useNavigate();

  const logoutClick = async () => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    await axios.get("http://localhost:3001/api/auth/logout", {
      withCredentials: true,
      headers: { authorization: `Bearer ${token}` },
    });
    localStorage.clear();
    navigate("/");
  };

  const userName = JSON.parse(localStorage.getItem("user")).user.user_firstname;
  return (
    <div onClick={logoutClick} className="logout_ctn">
      <div className="user-name-profil">
        <p>Bonjour {userName} ! </p>
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
