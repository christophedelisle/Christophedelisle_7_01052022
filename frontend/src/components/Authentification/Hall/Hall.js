import React from "react";

// Zone used for the 2 states (login and register) with props (to Authentication)

const Hall = ({ children, onClick, className }) => {
  return (
    <div className={className} onClick={onClick}>
      <h2>{children}</h2>
    </div>
  );
};

export default Hall;
