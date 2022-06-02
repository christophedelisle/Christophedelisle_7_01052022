import React from "react";

const Hall = ({ children, onClick, className }) => {
  return (
    <div className={className} onClick={onClick}>
      <h2>{children}</h2>
    </div>
  );
};

export default Hall;
