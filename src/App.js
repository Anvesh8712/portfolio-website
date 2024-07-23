import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import Header from "./components/Header/Header";
import About from "./components/About/About";

function App() {
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
    </div>
  );
}

export default App;
