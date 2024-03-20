import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Tab, Tabs,Badge, Image, Button, Modal, Form ,Table} from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./css/ViewProperty.css";
import ReviewsList from "../Components/reviews";
import {jwtDecode  } from "jwt-decode";
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
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const uid = decodedToken.user.id;
        const userRole = decodedToken.user.role;
        setUserId(uid);
        setUserRole(userRole);
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
      property : id
    };
    console.log("Request Data:", requestData);

    axios
      .post(`http://localhost:8000/requests/`, 
        requestData
      )
      .then((res) => {
        // Handle success
        console.log("Request submitted successfully");
        setSubmittingRequest(false);
        setShowModal(false);
      })
      .catch((err) => {
        // Handle error
        console.error("Error submitting request:", err);
        setSubmittingRequest(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitRequest();
  };

  return (
    <Container fluid>
      <h1 className>
        <Badge bg="secondary">Property Detail</Badge>
      </h1>
      <Row>
        <Col>
          {propertyInfo && (
            <div>
     <Card>
  <div className="prop-image-container">
    <Image className="prop-image" src={selectedImage} />
  </div>
  {propertyInfo.image1 && propertyInfo.image2 && propertyInfo.image3 && (
    <>
      <Card.Title className="display-5 mb-4 text-center">
        Additional Images
      </Card.Title>
      <div className="thumbnail-container">
        <div
          className={`thumbnail ${selectedImage === propertyInfo.image ? "selected" : ""}`}
          onClick={() => handleThumbnailClick(propertyInfo.image)}
        >
          <Image className="thumbnail-image" src={propertyInfo.image} />
          <div className="thumbnail-title">Image 1</div>
        </div>
        <div
          className={`thumbnail ${selectedImage === propertyInfo.image1 ? "selected" : ""}`}
          onClick={() => handleThumbnailClick(propertyInfo.image1)}
        >
          <Image className="thumbnail-image" src={propertyInfo.image1} />
          <div className="thumbnail-title">Image 2</div>
        </div>
        <div
          className={`thumbnail ${selectedImage === propertyInfo.image2 ? "selected" : ""}`}
          onClick={() => handleThumbnailClick(propertyInfo.image2)}
        >
          <Image className="thumbnail-image" src={propertyInfo.image2} />
          <div className="thumbnail-title">Image 3</div>
        </div>
        <div
          className={`thumbnail ${selectedImage === propertyInfo.image3 ? "selected" : ""}`}
          onClick={() => handleThumbnailClick(propertyInfo.image3)}
        >
          <Image className="thumbnail-image" src={propertyInfo.image3} />
          <div className="thumbnail-title">Image 4</div>
        </div>
      </div>
    </>
  )}
</Card>
            </div>
          )}
        </Col>
        <Col>
          <Card >
            <Card.Body >
              <Card.Title   >
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
                defaultActiveKey="home"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
              >
                <Tab eventKey="property overview" title="Property Overview">
                  <Table>
                    <thead>
                      <tr>
                        <th>Property Address</th>
                        <th>Property Price</th>
                        <th>Property Type</th>
                        <th>Square Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>  {propertyInfo.title}</td>
                        <td>{propertyInfo.price}</td>
                        <td>{propertyInfo.type}</td>
                        <td>{propertyInfo.address}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Tab>
                <Tab eventKey="basic information" title="Basic Information">
                  <Table striped>
                    <thead>
                      <tr>
                        <th>Rooms</th>
                        <th>Bathrooms</th>
                        <th>Owner</th>
                        <th>Availability</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{propertyInfo.rooms}</td>
                        <td>{propertyInfo.bathrooms}</td>
                        <td>{propertyInfo.owner}</td>
                        <td>{propertyInfo.availability}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Tab>
                <Tab eventKey="property track" title="Property Track">
                  <Table striped>
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Date</th>
                        <th>User</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Inspection</td>
                        <td>01/01/2023</td>
                        <td>John Doe</td>
                        <td>N/A</td>
                      </tr>
                    </tbody>
                  </Table>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
          <h5 className="mt-4">Reviews:</h5>
          <ReviewsList userId={userId} propertyId={id} />
          {userRole === "Renter" && (
            <Button variant="primary" onClick={handleButtonClick}>
              Request Property
            </Button>
          )}
  
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
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formMessage">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formPrice">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={submittingRequest}>
                      {submittingRequest ? "Submitting..." : "Submit Request"}
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
        
    
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyView;