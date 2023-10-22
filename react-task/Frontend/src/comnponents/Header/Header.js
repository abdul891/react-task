import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedin") === "true";
const handleLogout = () => {
    localStorage.removeItem("isLoggedin");
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary p-0">
      <Container className={styles.nav_container}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
            <Navbar.Brand>
              <Link to="/dashboard" className={`nav-link ${styles.brand_logo}`}>
                <h1><strong>Logo</strong></h1>
              </Link>
            </Navbar.Brand>
            
          </Nav>
          <Nav>
            <Navbar.Brand>
              <Link to="/dashboard" className={`nav-link ${styles.nav_item}`}>
                Dashboard
              </Link>
            </Navbar.Brand>
            <Navbar.Brand>
              <Link to={"/create-test"} className={`nav-link ${styles.nav_item}`}>
                Create Test
              </Link>
            </Navbar.Brand>
          </Nav>
        </Navbar.Collapse>
        <Nav>
          {isLoggedIn ? (
            <Nav.Link
              onClick={handleLogout}
              className={`nav-link ${styles.logout_btn} text-white`}
            >
              Logout
            </Nav.Link>
          ) : null}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
