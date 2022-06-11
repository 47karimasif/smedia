import { useQuery } from "@apollo/client";
import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { ME_QUERY } from "../pages/Profile";
import "../styles/logout.css";
import { AuthContext } from "../context/auth";

const logoutModalStyles = {
  content: {
    top: "85%",
    left: "20%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    borderRadius: "25px",
    width: "15em",

    minWidth: "5em",
    minHeight: "2em",
    maxHeight: "3em",
  },
  overlay: {
    background: "#9e9e9e69",
  },
};

export default function Logout() {
  const { logoutfn } = useContext(AuthContext);
  const [modalIsOpen, setIsOpen] = useState(false);

  const { loading, error, data } = useQuery(ME_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    logoutfn();
  };

  return (
    <div className="logout">
      <span onClick={openModal} style={{ flex: 1, flexDirection: "row" }}>
        <h4>
          <img
            src={data.me.Profile.avatar}
            style={{ width: "40px", borderRadius: "50%" }}
            alt="avatar"
          />
          <span style={{ marginLeft: "10px", marginTop: "-10px" }}>
            {data.me.name}
          </span>
          <span style={{ marginLeft: "30px" }}>
            <i className="fas fa-ellipsis-h"></i>
          </span>
        </h4>
      </span>
      <div style={{ position: "absolute", bottom: 0 }}>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Modal"
          style={logoutModalStyles}
        >
          <span onClick={handleLogout} style={{ cursor: "pointer" }}>
            <p style={{ borderBottom: "1px solid black" }}>
              Log out @{data.me.name}
            </p>
          </span>
        </Modal>
      </div>
    </div>
  );
}
