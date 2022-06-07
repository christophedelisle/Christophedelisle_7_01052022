import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const Delete = ({ onClick }) => {
  return (
    <div className="delete" onClick={onClick}>
      <FontAwesomeIcon icon={faClose} />
    </div>
  );
};

export default Delete;
