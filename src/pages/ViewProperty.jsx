import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Tab, Tabs, Table, Badge, Image } from "react-bootstrap";
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

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const uid = decodedToken.user.id;
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
                        <th>Property Type</th>
                        <th>Square Footage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{propertyInfo.address}</td>
                        <td>{propertyInfo.type}</td>
                        <td>{propertyInfo.squareFootage}</td>
                        <td>{propertyInfo.numUnits}</td>
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
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyView;
