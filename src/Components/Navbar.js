import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../MyStore/actions/authAction";
import { jwtDecode } from "jwt-decode";
import '../pages/css/Navbar.css'
import LogoImage from '../images/logo1.png';

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const useSel = useSelector((state) => state.authReducer.isLoggedIn);
  const refreshToken = useSelector((state) => state.authReducer.refreshToken);
  const dispatch = useDispatch();
  const [fName, setFname] = useState("");
  const [userId, setUserId] = useState(null);
  let history = useNavigate();

  useEffect(() => {
    if (refreshToken) {
      setIsLoggedIn(true);
      const decodedToken = jwtDecode(refreshToken);
      const userName = decodedToken.user.username;
      const uid = decodedToken.user.id;
      setFname(userName);
      setUserId(uid);
    } else {
      setIsLoggedIn(false);
    }
  }, [useSel, refreshToken]);

  const handleLogout = () => {
    dispatch(logout());
    setIsLoggedIn(false);
    history("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={LogoImage}
            alt="FoRent Logo"
            style={{ height: '35px', width: 'auto', marginRight: '10px' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" style={{ fontWeight: "bold" }}>
              Home
            </Nav.Link>
            {isLoggedIn || useSel ? (
              <>
                <Nav.Link as={Link} to="/OwnerProperties" style={{ fontWeight: "bold" }}>
                  My Properties
                </Nav.Link>
                <Nav.Link as={Link} to="/requests" style={{ fontWeight: "bold" }}>
                  My Requests
                </Nav.Link>
              </>
            ) : null}
          </Nav>
          <Nav>
            {isLoggedIn || useSel ? (
              <>
                <Nav.Link
                  as={Link}
                  to={`/user/${userId}`}
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
