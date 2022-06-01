import React from "react";
//import "../../../styles/pages/logins/_hall.scss";

const Hall = ({ children, onClick, className }) => {
  return (
    <div className={className} onClick={onClick}>
      <h2>{children}</h2>
    </div>
  );
};

export default Hall;
