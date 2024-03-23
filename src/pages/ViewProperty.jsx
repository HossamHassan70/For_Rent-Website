import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Tab, Tabs, Badge, Image, Button, Modal, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./css/ViewProperty.css";
import ReviewsList from "../Components/reviews";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

const PropertyView = () => {
  const { id } = useParams();
  const [propertyInfo, setPropertyInfo] = useState({});
  const [userId, setUserId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const token = useSelector((state) => state.authReducer.refreshToken);
  const [userRole, setUserRole] = useState("");
  const [submittingRequest, setSubmittingRequest] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    message: "",
    price: ""
  });
  const [formErrors, setFormErrors] = useState({});
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const uid = decodedToken.user.id;
        const userRole = decodedToken.user.role;
        setUserRole(userRole);
        setUserId(uid);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    axios
      .get(`http://localhost:8000/properties/${id}`)
      .then((res) => {
        setPropertyInfo(res.data);
        setSelectedImage(res.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, token]);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitRequest();
    const errors = {};

    if (!form.title) {
      errors.title = "Title is required";
    }

    if (!form.message) {
      errors.message = "Message is required";
    }

    if (!form.price) {
      errors.price = "Price is required";
    } else if (isNaN(form.price)) {
      errors.price = "Price must be a number";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log("Form submitted successfully");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmitRequest = () => {
    setSubmittingRequest(true);
    const requestData = {
      title: form.title,
      message: form.message,
      price: form.price,
      renter: userId,
      owner: propertyInfo.owner,
      property: id
    };

    axios
      .post(`http://localhost:8000/requests/`,
        requestData
      )
      .then((res) => {
        
        console.log("Request submitted successfully");
        setSubmittingRequest(false);
        setShowModal(false);
      })
      .catch((err) => {
        
        console.error("Error submitting request:", err);
        setSubmittingRequest(false);
      });
  };


  return (
    <Container fluid>
      <h1 className>
        <Badge bg="secondary">Property Detail</Badge>
      </h1>
      <Row>
        <Col className="my-2" xs={12}>
          {propertyInfo && (
            <div>
              <Card>
                <div className="prop-image-container">
                  <Image className="prop-image" src={selectedImage} />
                </div>
                {(propertyInfo.image1 || propertyInfo.image2 || propertyInfo.image3) && (
                  <>
                    <Card.Title className="display-5 mb-4 text-center">
                      Additional Images
                    </Card.Title>
                    <div className="thumbnail-container">
                      {propertyInfo.image && <div className={`thumbnail ${selectedImage === propertyInfo.image ? "selected" : ""}`} onClick={() => handleThumbnailClick(propertyInfo.image)}>
                        <Image className="thumbnail-image" src={propertyInfo.image} />
                        <div className="thumbnail-title">Image 1</div>
                      </div>}
                      {propertyInfo.image1 && <div className={`thumbnail ${selectedImage === propertyInfo.image1 ? "selected" : ""}`} onClick={() => handleThumbnailClick(propertyInfo.image1)}>
                        <Image className="thumbnail-image" src={propertyInfo.image1} />
                        <div className="thumbnail-title">Image 2</div>
                      </div>}
                      {propertyInfo.image2 && <div className={`thumbnail ${selectedImage === propertyInfo.image2 ? "selected" : ""}`} onClick={() => handleThumbnailClick(propertyInfo.image2)}>
                        <Image className="thumbnail-image" src={propertyInfo.image2} />
                        <div className="thumbnail-title">Image 3</div>
                      </div>}
                      {propertyInfo.image3 && <div className={`thumbnail ${selectedImage === propertyInfo.image3 ? "selected" : ""}`} onClick={() => handleThumbnailClick(propertyInfo.image3)}>
                        <Image className="thumbnail-image" src={propertyInfo.image3} />
                        <div className="thumbnail-title">Image 4</div>
                      </div>}
                    </div>
                  </>
                )}
              </Card>
            </div>
          )}
        </Col>
        <Col className="my-2" xs={12} lg={8}>

          <Card>
            <Card.Body>
              <Card.Title>
                <p>Title:</p>
              </Card.Title>
              {propertyInfo.title}
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title className="mb-2">
                <b>Description:</b> {propertyInfo.description}
              </Card.Title>
            </Card.Body>
          </Card>

          <Card className="price-card">
            <Card.Body>
              <Card.Title>Price</Card.Title>
              ${propertyInfo.price}
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>Property Description:</Card.Header>
            <Card.Body>
              <Tabs
                defaultActiveKey="property overview"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
              >
                <Tab eventKey="property overview" title="Property Overview">
                  <div>
                    <p><b>Property Address:</b> {propertyInfo.address}</p>
                    <p><b>Property Price:</b> ${propertyInfo.price}</p>
                    <p><b>Property Type:</b> {propertyInfo.type}</p>
                    <p><b>Square Address:</b> {propertyInfo.address}</p>
                  </div>
                </Tab>
                <Tab eventKey="basic information" title="Basic Information">
                  <div>
                  <p><b>Rooms:</b> {propertyInfo.rooms}</p>
                    <p><b>Bathrooms:</b> {propertyInfo.bathrooms}</p>
                    <p><b>Owner:</b> {propertyInfo.owner}</p>
                    <p>
                      <b>Availability:</b>{" "}
                      <span className={`badge ${propertyInfo.availability ? "bg-success" : "bg-danger"}`}>
                        {propertyInfo.availability ? "Available" : "Not Available"}
                      </span>
                    </p>
                  </div>
                </Tab>
                <Tab eventKey="property track" title="Property Track">
                  <div>
                    <p><b>Status:</b> Inspection</p>
                    <p><b>Date:</b> 01/01/2023</p>
                    <p><b>User:</b> John Doe</p>
                    <p><b>Notes:</b> N/A</p>
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
          {userRole === "Renter" && propertyInfo.availability && (
            <div className="d-flex justify-content-end">
              <Button className="mt-3" variant="primary" onClick={handleButtonClick}>
                Request Property
              </Button>
            </div>
          )}
        </Col>

        <Col className="my-2" xs={12} lg={4}>
          <h5 className="mt-4">Reviews:</h5>
          <ReviewsList userId={userId} propertyId={id} />
        </Col>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Request Property</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  isInvalid={!!formErrors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.title}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  isInvalid={!!formErrors.message}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  isInvalid={!!formErrors.price}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.price}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit" disabled={submittingRequest}>
                {submittingRequest ? "Submitting..." : "Submit Request"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Row>
    </Container>
  );
};

export default PropertyView;