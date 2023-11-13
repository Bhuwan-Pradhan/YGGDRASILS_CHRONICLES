import "../../css/components/Popup.css";

import React, { useState } from "react";
import ReactModal from "react-modal";
import Comment from "../core/Post/Comment";
import { GiTireIronCross } from "react-icons/gi";

function Popup(props) {
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
          <div className="PopupBoxHeader">
            <div>Comments</div>
            <button className="CloseButton" onClick={() => setIsOpen(false)}>
             <GiTireIronCross />
            </button>
          </div>
         <div><Comment id={props.postId}/></div>
        </div>
      </ReactModal>
    </div>
  );
}

export default Popup;
