import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Container, Row, Col } from 'react-bootstrap';
import logo from '../images/logo.jpeg';

function Footer() {
    return (
        <div className="footer pt-3 pb-3 text-black text-center text-md-start" style={{ marginTop: "30px", background: "white" }}>
            <Container>
                <Row>
                    <Col  className="d-flex justify-content-start">
                    <div className="info mb-3">
                            <img src={logo} alt="FORENT Logo" style={{ width: "150px" }} />
                            <div className="copyright">
                                <div>
                                    &copy; 2024 -{" "}
                                    <span className="text-black">
                                        FORENT. All Rights Reserved
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col  className="d-flex justify-content-center">
                        <div className="links">
                            <h5 className="text-black">About Us</h5>
                            <ul className="list-unstyled lh-lg">
                                <li><Link to="/register" className="text-black text-decoration-none">Register</Link></li>
                                <li><Link to="/login" className="text-black text-decoration-none">LogIn</Link></li>
                                <li><Link to="/about" className="text-black text-decoration-none">About Us</Link></li>
                            </ul>
                        </div>
                    </Col>
                    <Col  className="d-flex justify-content-end">
                        <div className="contact">
                            <h5 className="text-black  text-center justify-content-center">Contact Us</h5>
                            <div className="contact-info">
                                <Row>
                                    <Col>
                                        <p className="lh-lg mt-2">Phone:6122089269</p>
                                    </Col>
                                    <Col>
                                        <p className="lh-lg mt-2">Mail:info@gmail.com</p>
                                    </Col>
                                </Row>
                            </div>
                            <ul className="d-flex justify-content-center mt-3 list-unstyled gap-3">
                                <li className="social-icon">
                                    <Link to="#" className="text-black">
                                        <FontAwesomeIcon icon={faFacebook} size="xl" />
                                    </Link>
                                </li>
                                <li className="social-icon">
                                    <Link to="#" className="text-black">
                                        <FontAwesomeIcon icon={faTwitter} size="xl" />
                                    </Link>
                                </li>
                                <li className="social-icon">
                                    <Link to="#" className="text-black">
                                        <FontAwesomeIcon icon={faInstagram} size="xl" />
                                    </Link>
                                </li>
                                <li className="social-icon">
                                    <Link to="#" className="text-black">
                                        <FontAwesomeIcon icon={faGoogle} size="xl" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Footer;