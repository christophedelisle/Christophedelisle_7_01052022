import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Delete = ({ onClick }) => {
  return (
    <div className="delete" onClick={onClick}>
      <FontAwesomeIcon icon={faTrash} />
    </div>
  );
};

export default Delete;
