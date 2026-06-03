import { HashRouter, NavLink, Route, Routes } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./App.css";

import Home from "./components/home";
import About from "./components/about";
import Contact from "./components/contact";
import Datenschutz from "./components/privacy";

function App() {
  return (
    <HashRouter>
      <div className="app-shell">
        <Navbar expand="lg" className="site-navbar" sticky="top">
          <Container className="layout-container">
            <Navbar.Brand as={NavLink} to="/" className="site-brand">
              Zoo Applikation
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="site-navigation" />

            <Navbar.Collapse id="site-navigation">
              <Nav className="site-nav ms-lg-auto">
                <Nav.Link as={NavLink} to="/" end>
                  Home
                </Nav.Link>
                <Nav.Link as={NavLink} to="/about">
                  About
                </Nav.Link>
                <Nav.Link as={NavLink} to="/contact">
                  Contact
                </Nav.Link>
                <Nav.Link as={NavLink} to="/privacy">
                  Datenschutz
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <main className="site-main">
          <Container className="layout-container">

            <section className="content-box">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Datenschutz />} />
              </Routes>
            </section>
          </Container>
        </main>

        <footer className="site-footer">
          <Container className="layout-container">
            <span>© {new Date().getFullYear()} Zoo Applikation</span>
          </Container>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;
