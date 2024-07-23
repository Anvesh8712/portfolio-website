import React from "react";
import "./Work.css";

import theme_pattern from "../../assets/theme_pattern.svg";

const Work = () => {
  return (
    <div className="work">
      <div class="work-title">
        <h1>Education and Work Experience</h1>
        <img src={theme_pattern} alt="theme" />
      </div>
      <div class="timeline">
        <div class="container left">
          <p />
          <i class="fa fa-code-fork" aria-hidden="true"></i>
          <div class="content">
            <h2>University of Massachusetts Amherst</h2>
            <p>August 2020 - May 2024</p>
            <p>Bachelors of Science in Computer Science.</p>
            <p>GPA: 3.82</p>
            <p>
              • Relevant Coursework: Web Programming, Programming Methodology,
              Applications of NLP, Operating Systems, Search Engines, Intro to
              Algorithms, Artificial Intelligence, Intelligent Visual Computing
            </p>
            <p>
              • Undergraduate Research Volunteer: Reinforced Learning VS SLAM in
              self-driving cars.
            </p>
          </div>
        </div>
        <div class="container right">
          <div class="content">
            <h2>HeadStarter AI</h2>
            <p>July 2024 - present</p>
            <p>Software Engineer Fellow</p>
          </div>
        </div>
        <div class="container left">
          <div class="content">
            <h2>RoyalStamp Inc</h2>
            <p>May 2023 - May 2024</p>
            <p>Full-Stack Developer</p>
            <p>
              • Collaborated with a cross-functional team to pivot towards
              consumer-facing web development from internal webpages.
            </p>
            <p>
              • Developed a streamlined consumer webpage, resulting in a 30%
              increase in document setup speed, thereby enhancing operational
              efficiency and user satisfaction.
            </p>
            <p>
              • Optimized data management using PostgreSQL, ensuring seamless
              database operations in the frontend. Implemented efficient SQL
              queries and optimized existing commands for enhanced performance
              and faster data retrieval.
            </p>
          </div>
        </div>
        <div class="container right">
          <div class="content">
            <h2>ScriptGrader Inc</h2>
            <p>August 2023 - November 2023</p>
            <p>Freelance FullStack Developer</p>
            <p>
              • Developed a movie script submission platform using Express.js,
              enabling writers to upload and manage content, and integrated
              role-based authentication for user differentiation.
            </p>
            <p>
              • Successfully transitioned file storage to AWS S3 using the AWS
              SDK and multer-s3, enhancing data reliability and scalability.
            </p>
            <p>
              • Leveraged ElephantSQL for cloud-based PostgreSQL storage,
              designing schemas and optimizing queries for efficient data
              retrieval and recommendations.
            </p>
          </div>
        </div>
        <div class="container left">
          <div class="content">
            <h2>RoyalStamp Inc</h2>
            <p>May 2022 - September 2022</p>
            <p>React Developer, Intern</p>
            <p>
              • Took charge of backend data operations, focusing on creating
              internal webpages that employees use for data entry.
            </p>
            <p>
              • Engineered and tested React components tailored for internal use
              with Jest and React Testing Library, ensuring compliance with
              accessibility and web browser standards.
            </p>
            <p>
              • Employed ReactJS components, forms, events, and Flux to enhance
              the functionality of internal web tools.
            </p>
          </div>
        </div>
        <div class="container right">
          <div class="content">
            <h2>Relevant Certifications</h2>
            <p>• AWS Cloud Practitioner</p>
            <p>• IBM Machine learning with Python.</p>
            <p>• Meta Backend Development</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
