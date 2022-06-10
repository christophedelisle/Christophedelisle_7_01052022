import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

// Logout button

const Logout = () => {
  const navigate = useNavigate();

  const logoutClick = async () => {
    const token = JSON.parse(localStorage.getItem("user")).token;
    await axios.get("http://localhost:3001/api/auth/logout", {
      headers: { authorization: `Bearer ${token}` },
    });
    localStorage.clear();
    navigate("/");
  };

  const desactivateAccount = () => {
    const token = JSON.parse(localStorage.getItem("user")).token;

    axios.get(`http://localhost:3001/api/auth/desactivateAccount`, {
      headers: { authorization: `Bearer ${token}` },
    });
    localStorage.clear();
    alert("Compte desactivé !");
    navigate("/");
  };

  const userName = JSON.parse(localStorage.getItem("user")).user.user_firstname;
  return (
    <div className="account_ctn">
      <div onClick={desactivateAccount} className="logout_ctn">
        <span>
          {" "}
          <FontAwesomeIcon className="logout_ctn-icon" icon={faTrashCan} />
          Desactiver le compte
        </span>
      </div>
      <div className="user-name-profil">
        <p>Bonjour {userName} ! </p>
      </div>
      <div onClick={logoutClick} className="logout_ctn">
        <span>
          {" "}
          <FontAwesomeIcon
            className="logout_ctn-icon"
            icon={faRightFromBracket}
          />
          Se déconnecter
        </span>
      </div>
    </div>
  );
};

export default Logout;
