import "./App.css";

import ReactGA from "react-ga4";

import NavBar from "./components/Navbar/NavBar";
import Header from "./components/Header/Header";
import About from "./components/About/About";
import Work from "./components/Work/Work";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  ReactGA.initialize("G-123EGMSB6Y");

  ReactGA.send({
    hitType: "pageview",
    page: "/",
    title: "Home",
  });

  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
        rel="stylesheet"
      />
      <NavBar />
      <Header />
      <About />
      <Work />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
