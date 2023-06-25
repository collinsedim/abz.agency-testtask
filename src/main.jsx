import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Team from "./components/Team";
import Signup from "./components/Signup";
import Footer from "./components/Footer";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Header />
    <Hero />
    <Team />
    <Signup />
    <Footer />
  </>
);
