import React from "react";
import "./Footer.css";
import logo from "../../assets/anvesh-high-resolution-logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <img src={logo} alt="" className="footer-logo" />
    </div>
  );
};

export default Footer;
