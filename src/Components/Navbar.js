import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../MyStore/actions/authAction";

// const NavigationBar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [fullName, setFullName] = useState(null);

//   // useEffect(() => {
//   //   const userData = sessionStorage.getItem("login");
//   //   if (userData) {
//   //     setIsLoggedIn(true);
//   //     const parsedData = JSON.parse(userData);
//   //     setFullName(parsedData[0].fullname);
//   //   } else {
//   //     setIsLoggedIn(false);
//   //     setFullName(null);
//   //   }
//   // }, [isLoggedIn]);

//   // const handleLogout = () => {
//   //   sessionStorage.removeItem("login");
//   //   setIsLoggedIn(false);
//   //   setFullName(null);
//   // };

//   useEffect(() => {
//     const refreshToken = sessionStorage.getItem("refreshToken");
//     if (refreshToken) {
//       setIsLoggedIn(true);
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, []);

//   return (
//     <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
//       <Container>
//         <Navbar.Brand as={Link} to="/" style={{ fontWeight: "bold" }}>
//           FoRent
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarNav" />
//         <Navbar.Collapse id="navbarNav">
//           <Nav className="me-auto">
//             <Nav.Link as={Link} to="/" style={{ fontWeight: "bold" }}>
//               Home
//             </Nav.Link>
//           </Nav>
//           <Nav>
//             {isLoggedIn ? (
//               <>
//                 <Nav.Link
//                   as={Link}
//                   to="/OwnerProperties"
//                   style={{ fontWeight: "bold" }}
//                 >
//                   My Properties
//                 </Nav.Link>
//                 <Nav.Link
//                   as={Link}
//                   to={`/user/1`}
//                   style={{ fontWeight: "bold" }}
//                 >
//                   {fullName}
//                 </Nav.Link>
//                 <Nav.Link style={{ fontWeight: "bold" }}>Logout</Nav.Link>
//               </>
//             ) : (
//               <>
//                 <Nav.Link as={Link} to="/login" style={{ fontWeight: "bold" }}>
//                   Login
//                 </Nav.Link>
//                 <Nav.Link
//                   as={Link}
//                   to="/register"
//                   style={{ fontWeight: "bold" }}
//                 >
//                   Signup
//                 </Nav.Link>
//               </>
//             )}
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavigationBar;

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState(null);
  let useSel = useSelector((state) => state.authReducer.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = sessionStorage.getItem("refreshToken");
    if (refreshToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accessToken");
    dispatch(logout());
    setIsLoggedIn(false);
    setFullName(null);
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
                  {fullName}
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
