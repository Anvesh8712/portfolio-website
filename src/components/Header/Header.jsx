import React from "react";
import "./Header.css";
import profile_pic from "../../assets/profile_pic.jfif";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Header = () => {
  const onButtonClick = () => {
    const pdfUrl = "Sunkara_Anvesh (5).pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Sunkara_Anvesh.pdf"; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="header" id="home">
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
        <div className="header-connect">
          <AnchorLink className="anchor-link" offset={50} href="#contact">
            Connect With Me
          </AnchorLink>
        </div>
        {/* <a
          id="download-link"
          href="public/Sunkara_Anvesh (5).pdf"
          download="Sunkara_Anvesh.pdf"
          className="anchor-link"
        > */}
        <div onClick={onButtonClick} className="header-resume">
          My Resume
        </div>
        {/* </a> */}
      </div>
    </div>
  );
};

export default Header;
