import React from "react";
import "./About.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import profile_img from "../../assets/profile_picture.jpg";

const About = () => {
  return (
    <div className="about" id="about">
      <div className="about-title">
        <h1>About Me</h1>
        <img src={theme_pattern} alt="theme_pattern"></img>
      </div>
      <div className="about-section">
        <div className="about-left">
          <img className="profile-img" src={profile_img} alt="" />
        </div>
        <div className="about-right">
          <div className="about-para">
            <p>
              Hello! I'm Anvesh Sunkara, a passionate frontend developer and
              software engineer based in the USA. With a strong foundation in
              computer science and hands-on experience in various technologies,
              I enjoy crafting visually appealing and user-friendly web
              applications.
            </p>
            <p>
              My journey in software development started with a deep curiosity
              about how things work and a desire to create solutions that make a
              difference. Over the years, I've honed my skills in React,
              JavaScript, and other frontend technologies, always striving to
              learn and grow as the tech landscape evolves.
            </p>
            <p>
              When I'm not coding, I enjoy exploring new technologies, reading
              about the latest trends in software development, and contributing
              to open-source projects. I believe in continuous learning and the
              power of collaboration to achieve great things.
            </p>
          </div>
          <div className="about-skills">
            <div className="about-skill">
              <p>HTML & CSS</p>
              <hr style={{ width: "50%" }}></hr>
            </div>
            <div className="about-skill">
              <p>React</p>
              <hr style={{ width: "70%" }}></hr>
            </div>
            <div className="about-skill">
              <p>Javascript</p>
              <hr style={{ width: "60%" }}></hr>
            </div>
            <div className="about-skill">
              <p>Next JS</p>
              <hr style={{ width: "50%" }}></hr>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="about-achievments">
        <div className="about-achivement">
          <h1>title</h1>
          <p>desc</p>
        </div>
        <hr />
        <div className="about-achivement">
          <h1>title</h1>
          <p>desc</p>
        </div>
        <hr />
        <div className="about-achivement">
          <h1>title</h1>
          <p>desc</p>
        </div>
      </div> */}
    </div>
  );
};

export default About;
