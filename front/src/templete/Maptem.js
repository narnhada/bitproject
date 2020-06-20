import React from "react";
import { Link } from "react-router-dom";
import Map from "../page/Map";
import Footer from "../page/Footer";
import "../css/tem.css";
import Header1 from "../page/Header1";

function Maptem() {
  return (
    <>
      <div className="body">
        <Header1></Header1>
        <Map></Map>
      </div>
    </>
  );
}

export default Maptem;
