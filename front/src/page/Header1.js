import React from "react";
import { Link } from "react-router-dom";
import home from "../images/home.jpg";
import { FcPrevious, FcHome } from "react-icons/fc";
import "../css/header1.css";

function Header1() {
    const Back =() =>{
        window.location.replace("/map");
    } 
    
    return (
    <div className="header1">
        
            <FcPrevious onClick={Back}></FcPrevious>
            <Link to ="/" className="home">
                <FcHome ></FcHome>
            </Link>
    </div>
  );
}

export default Header1;
