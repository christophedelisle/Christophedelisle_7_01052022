import React from "react";
//import "./styles/_header";
//import { NavLink } from "react-router-dom";
//import ProfileTab from "./ProfileTab/ProfileTab";

const Header = () => {
  return (
    <div className="header">
      <p></p>
      <img
        className="header__logo"
        src="./imgs/logo/icon-left-font-recadre.png"
        alt="Groupomania"
      />
      {/* <NavLink exact to="/">
        <img
          className="logo"
          src="./imgs/logo/icon-left-font-recadre.png"
          alt="Groupomania"
        />
      </NavLink> */}
      {/* {profileTab && <ProfileTab />} */}
    </div>
  );
};

export default Header;

/*import React, { useEffect, useState } from "react";

const Header = (props) => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(100);
  };
  useEffect(() => {
    console.log("ça a changé");
  }, []);

  return (
    <div>
      <div className="header-container">
        <h1>{props.title}</h1>
        {props.nav.map((el) => (
          <li>{el}</li>
        ))}
      </div>
      <p>{count}</p>
      <button onClick={handleClick}>ajouter</button>
    </div>
  );
};

export default Header;*/
