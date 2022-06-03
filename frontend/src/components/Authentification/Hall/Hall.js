import React from "react";

// Zone utilisée pour les 2 états ( login et register) avec props (vers Authentification)

const Hall = ({ children, onClick, className }) => {
  return (
    <div className={className} onClick={onClick}>
      <h2>{children}</h2>
    </div>
  );
};

export default Hall;
