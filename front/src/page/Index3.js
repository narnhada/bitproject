import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import Map from "./Map";
import "../css/index.css";
import { FiUserPlus, FiMap, FiUserMinus, FiEdit } from "react-icons/fi";

function Index3() {
  const OnClick = (e) => {
    window.sessionStorage.removeItem("id");
    window.location.replace("/");
  };
  return (
    <>
      <div className="id">
        <h3>{window.sessionStorage.getItem("id")}님 안녕하세요</h3>
      </div>
      <div className="index">
        <Link to="/map" className="inmap">
          <FiMap></FiMap>
          <h3>Map</h3>
        </Link>
        <Link to="/biyong" className="biyong">
          <FiEdit></FiEdit>
          <h3>report</h3>
        </Link>
        <Link to="/join" className="join">
          <FiUserPlus></FiUserPlus>
          <h3>join</h3>
        </Link>

        <div className="logout">
          <FiUserMinus onClick={OnClick}></FiUserMinus>
          <h3>Logout</h3>
        </div>
      </div>
    </>
  );
}

export default Index3;
