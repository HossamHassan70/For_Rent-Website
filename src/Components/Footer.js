import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faXTwitter, faInstagram, faGoogle } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="container-fluid">
      <div className="footer pt-3 pb-3 text-black text-center text-md-start" style={{ marginTop: '30px', background: 'white' }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="info mb-3">
              <p className="mb-3">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit,sit amet consectetur adipisicing elit.
              </p>
              <div className="copyright" style={{ marginTop: '90px' }}>
                <div>&copy; 2024 - <span className="text-black">FORENT. All Rights Reserved</span></div>
              </div>
            </div>
          </div>
            <div className="col-md-6 col-lg-2">
              <div className="links">
                <h5 className="text-black">Links</h5>
                <ul className="list-unstyled lh-lg">
                  <li>Our Services</li>
                  <li>Submit Property</li>
                  <li>Support</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-2">
              <div className="links">
                <h5 className="text-black">About Us</h5>
                <ul className="list-unstyled lh-lg">
                  <li>Sign In</li>
                  <li>Register</li>
                  <li>About Us</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="contact" style={{marginLeft: '100px'}}>
                <h5 className="text-black">Contact Us</h5>
                <p className="lh-lg mt-2 mb-0">Phone: 6122089269</p>
                <p className="lh-lg mt-1 mb-3">E-Mail: info@gmail.com</p>
                <ul className="d-flex justify-content-center mt-3 list-unstyled gap-3">
                  <li>
                    <a className="d-block text-black" href="#">
                      <FontAwesomeIcon icon={faFacebook} size="xl" />
                    </a>
                  </li>
                  <li>
                    <a className="d-block text-black" href="#">
                      <FontAwesomeIcon icon={faXTwitter} size="xl" />
                    </a>
                  </li>
                  <li>
                    <a className="d-block text-black" href="#">
                      <FontAwesomeIcon icon={faInstagram} size="xl" />
                    </a>
                  </li>
                  <li>
                    <a className="d-block text-black" href="#">
                      <FontAwesomeIcon icon={faGoogle} size="xl" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
