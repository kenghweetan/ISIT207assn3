import React, { useState } from "react";
import { GiSittingDog } from "react-icons/gi";
import { BiRefresh } from "react-icons/bi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Modal from "react-modal";
import WithToolTip from "./ToolTip";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#2E4E94",
    borderRadius: "20px",
  },
};

function refreshPage() {
  window.location.reload();
}

Modal.setAppElement("#root");

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <div className="title" id="startShow">
        <h1>
          Fun dog <GiSittingDog className="icon" />
        </h1>
      </div>

      <div id="navbar">
        <ul className="navlink">
          <li href="#">
            <WithToolTip toolTipText={"Load new images"}>
              <button className="btn btn-refresh" onClick={refreshPage}>
                <BiRefresh className="btn-icon" />
              </button>
            </WithToolTip>
          </li>
          <li href="#">
            <WithToolTip toolTipText={"Contact me"}>
              <button
                className="btn btn-info"
                onClick={() => setModalIsOpen(true)}
              >
                <AiOutlineInfoCircle className="btn-icon" />
              </button>
            </WithToolTip>
          </li>
        </ul>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
      >
        <h1 style={{ textAlign: "center" }}>
          Welcome to dog Fun{" "}
          <GiSittingDog
            style={{ display: "inline-block", verticalAlign: "middle" }}
          />
        </h1>
        <hr></hr>
        <h2>Author: Keng Hwee Tan</h2>
        <h2>Contact: tankenghwee1996@gmail.com</h2>
        <p>Credit Images: https://dog.ceo/dog-api/</p>
        <div>
          <button
            className="btn btn-close"
            onClick={() => setModalIsOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Header;
