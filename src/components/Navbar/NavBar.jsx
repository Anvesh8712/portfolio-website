import React from "react";
import "./NavBar.css";
import logo from "../../assets/anvesh-high-resolution-logo.png";

const NavBar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="logo"></img>
      <ul className="nav-menu">
        <li>Home</li>
        <li>About Me</li>
        <li>Work Experience</li>
        <li>Projects</li>
        <li>Contact</li>
      </ul>
      <div className="nav-connect">connect with me</div>
    </div>
  );
};

export default NavBar;
