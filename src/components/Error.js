import React from "react";

const Error = ({ message }) => {
  return (
    <div className="error-wrapper">
      <h4>{message}</h4>
    </div>
  );
};

export default Error;
