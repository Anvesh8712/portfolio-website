import React from "react";
import { useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import "./NavBar.css";
import logo from "../../assets/anvesh-high-resolution-logo.png";
import underline from "../../assets/nav_underline.svg";

const NavBar = () => {
  const [menu, setShowMenu] = useState("home");

  return (
    <div className="navbar">
      <img src={logo} alt="logo" className="navbar-img"></img>
      <ul className="nav-menu">
        <li>
          <AnchorLink className="anchor-link" href="#home">
            <p onClick={() => setShowMenu("home")}>Home</p>
          </AnchorLink>
          {menu === "home" ? <img src={underline} alt="" /> : <div />}
        </li>
        <li>
          <AnchorLink className="anchor-link" offset={50} href="#about">
            <p onClick={() => setShowMenu("about")}>About Me</p>
          </AnchorLink>
          {menu === "about" ? <img src={underline} alt="" /> : <div />}
        </li>
        <li>
          <AnchorLink className="anchor-link" offset={50} href="#work">
            <p onClick={() => setShowMenu("work")}>Work Experience</p>
          </AnchorLink>
          {menu === "work" ? <img src={underline} alt="" /> : <div />}
        </li>
        <li>
          <AnchorLink className="anchor-link" offset={50} href="#project">
            <p onClick={() => setShowMenu("project")}>Projects</p>
          </AnchorLink>
          {menu === "project" ? <img src={underline} alt="" /> : <div />}
        </li>
        <li>
          <AnchorLink className="anchor-link" offset={50} href="#contact">
            <p onClick={() => setShowMenu("contact")}>Contact</p>
          </AnchorLink>
          {menu === "contact" ? <img src={underline} alt="" /> : <div />}
        </li>
      </ul>
      <div className="nav-connect">
        {" "}
        <AnchorLink className="anchor-link" offset={50} href="#contact">
          connect with me
        </AnchorLink>
      </div>
    </div>
  );
};

export default NavBar;
