import React from "react";
import "./Header.css";
import profile_pic from "../../assets/profile_pic.jfif";

const Header = () => {
  return (
    <div className="header">
      <img src={profile_pic} alt="Profile"></img>
      <h1>
        <span>I'm Anvesh Sunkara, </span>
        frontend developer and software engineer based in USA.
      </h1>
      <p>
        Passionate about building user-centric web applications with a focus on
        responsive design and performance.
      </p>
      <div className="header-action">
        <div className="header-connect">Connect With Me</div>
        <div className="header-resume">My Resume</div>
      </div>
    </div>
  );
};

export default Header;
