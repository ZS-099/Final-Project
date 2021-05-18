import React from "react";

const Welcome = ({ message,body }) => {
  return (
    <div className="welcome">
      <h1 className="welcome__header">{message}</h1>
      <p className="welcome__body">{body}</p>
    </div>
  );
};

export default Welcome;
