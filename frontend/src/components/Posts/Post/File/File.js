import React from "react";

const File = ({ FileURL }) => {
  return (
    <div className="file">
      {<img src={FileURL} alt="aPicture" className="file_img" />}
    </div>
  );
};

export default File;
