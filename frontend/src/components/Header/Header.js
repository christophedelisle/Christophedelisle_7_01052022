import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
//import { fab } from "@fortawesome/free-brands-svg-icons";
import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="header">
      <img
        className="header__logo"
        src="./imgs/logo/icon-left-font-ajuste.png"
        alt="Groupomania"
      />
      <FontAwesomeIcon icon="fa-solid fa-bracket-curly" />
    </div>
  );
};

export default Header;
library.add(faCheckSquare, faCoffee);
