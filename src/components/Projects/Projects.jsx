import React from "react";
import "./Projects.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import Services_Data from "../../assets/services_data";
import Array_icon from "../../assets/arrow_icon.svg";

const Projects = () => {
  return (
    <div className="projects">
      <div className="project-title" id="project">
        <h1>My Projects</h1>
        <img src={theme_pattern} alt="" />
      </div>
      <div className="project-container">
        {Services_Data.map((service, index) => {
          return (
            <div key={index} className="projects-format">
              <a
                href={service.s_link}
                className="anchor-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3>{service.s_no}</h3>
                <h2>{service.s_name}</h2>
                <p>{service.s_desc}</p>
                <div className="projects-code">
                  <p>See Github</p>
                  <img src={Array_icon} alt="arrow" />
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
