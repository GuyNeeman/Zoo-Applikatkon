import { HashRouter, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./App.css";

import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./components/home";
import About from "./components/about";
import Contact from "./components/contact";
import Login from "./components/login";
import Register from "./components/register";

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Shell />
      </HashRouter>
    </AuthProvider>
  );
}

function Shell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="app-shell">
      <Navbar expand="lg" className="site-navbar" sticky="top">
        <Container className="layout-container">
          <Navbar.Brand as={NavLink} to="/" className="site-brand">
            Zoo Applikation
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="site-navigation" />

          <Navbar.Collapse id="site-navigation">
            <Nav className="site-nav ms-lg-auto">
              <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
              <Nav.Link as={NavLink} to="/about">About</Nav.Link>
              <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
            </Nav>

            <Nav className="ms-lg-3" style={{ paddingTop: 10 }}>
              {user ? (
                <>
                  <span style={userBadgeStyle}>{user.email}</span>
                  <button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
                    Abmelden
                  </button>
                </>
              ) : (
                <Nav.Link as={NavLink} to="/login">
                  <button className="btn btn-primary btn-sm">Anmelden</button>
                </Nav.Link>
              )}
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
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
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
  );
}

const userBadgeStyle = {
  display: "flex",
  alignItems: "center",
  padding: "0 0.5rem",
  fontSize: "0.85rem",
  color: "var(--muted)",
  maxWidth: 160,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};
