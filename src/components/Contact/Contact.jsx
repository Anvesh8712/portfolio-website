import React, { useRef } from "react";
import "./Contact.css";
import theme_pattern from "../../assets/theme_pattern.svg";
import mail_icon from "../../assets/mail_icon.svg";
import linkedin_icon from "../../assets/social.png";
import github_icon from "../../assets/github.png";

const Contact = () => {
  const formRef = useRef(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "ce6d7fbb-5f83-4aa3-8f07-07a021da8f3b");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      alert(res.message);
      formRef.current.reset();
    }
  };

  return (
    <div className="contact" id="contact">
      <div className="contact-title">
        <h1>Get in Touch!</h1>
        <img src={theme_pattern} alt="" />
      </div>
      <div className="contact-section">
        <div className="contact-left">
          <h1>Let's Talk</h1>
          <p>
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision. Whether you have a
            question, want to collaborate, or just want to say hi, feel free to
            reach out. Let's create something amazing together!
          </p>
          <div className="contact-details">
            <div className="contact-detail">
              <img src={mail_icon} alt="" />
              <p>atvanvesh@gmail.com</p>
            </div>
            <div className="contact-detail">
              <img src={linkedin_icon} alt="" className="linkedin-img" />
              <p>heres my linkedin</p>
            </div>
            <div className="contact-detail">
              <img src={github_icon} alt="" className="github-img" />
              <p>heres my github</p>
            </div>
          </div>
        </div>
        <form onSubmit={onSubmit} className="contact-right" ref={formRef}>
          <label htmlFor="">Your Name</label>
          <input type="text" placeholder="Enter your name" name="name" />

          <label htmlFor="">Your Email</label>
          <input type="email" placeholder="Enter your email" name="email" />

          <label htmlFor="">Write your message here</label>
          <textarea
            name="message"
            rows="8"
            placeholder="Enter your message"
          ></textarea>
          <button type="submit" className="contact-submit">
            Submit now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
