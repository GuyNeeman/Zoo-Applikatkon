import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import About from "./components/about";
import Contact from "./components/contact";
import Home from "./components/home";

function App() {


  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>  
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
