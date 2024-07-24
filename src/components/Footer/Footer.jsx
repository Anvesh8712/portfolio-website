import React from "react";
import "./Footer.css";
import logo from "../../assets/anvesh-high-resolution-logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-top-left">
          <img src={logo} alt="" className="footer-logo" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
