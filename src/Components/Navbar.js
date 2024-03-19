import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../MyStore/actions/authAction";
import { jwtDecode } from 'jwt-decode';

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let useSel = useSelector((state) => state.authReducer.isLoggedIn);
  const dispatch = useDispatch();
  const [fName, setFname] = useState("");
  let history = useNavigate();

  useEffect(() => {
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (refreshToken) {
      setIsLoggedIn(true);

      const decodedToken = jwtDecode(refreshToken);
      const userFname = decodedToken.user.firstName;
      setFname(userFname);
    } else {
      setIsLoggedIn(false);
    }
  }, [useSel]);

  const handleLogout = () => {
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accessToken");
    dispatch(logout());
    setIsLoggedIn(false);
    history("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ fontWeight: "bold" }}>
          FoRent
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={{ fontWeight: "bold" }}>
              Home
            </Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn || useSel ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/OwnerProperties"
                  style={{ fontWeight: "bold" }}
                >
                  My Properties
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to={`/user/1`}
                  style={{ fontWeight: "bold" }}
                >
                  <p className="m-0">Welcome, {fName}</p>
                </Nav.Link>
                <Nav.Link onClick={handleLogout} style={{ fontWeight: "bold" }}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" style={{ fontWeight: "bold" }}>
                  Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/register"
                  style={{ fontWeight: "bold" }}
                >
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
