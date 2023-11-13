import "./PopupDemo.css";

import React, { useState } from "react";
import ReactModal from "react-modal";
import closeImg from "./assets/cross.png";

function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Comments</button>
      <ReactModal
        className="RM"
        isOpen={isOpen}
        contentLabel="Example Modal"
        onRequestClose={() => setIsOpen(false)}
      >
        <div className="PopupBox">
          <div className="CommentsBoxHeader">
            <div>Comments</div>
            <button className="CloseButton" onClick={() => setIsOpen(false)}>
              {" "}
              &times;{" "}
            </button>
          </div>
          <div className="CommentDiv">
            <div className="UserDetails">
              {" "}
              Comment karne wala user ka details{" "}
            </div>
            <div className="CommentBody"> Jo comment kiya wo </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}

export default Example;
