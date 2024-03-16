import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Tab,
  Tabs,
  Table,
  Image,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./css/ViewProperty.css";
import ReviewsList from "../Components/reviews";

const PropertyView = () => {
  const propertyId = useParams();
  const [propertyInfo, setpropertyInfo] = useState({});

  useEffect(() => {
    axios(`https://dummyjson.com/products/${propertyId.id}`)
      .then((res) => {
        setpropertyInfo(res.data); // Assuming the response data is in JSON format
      })
      .catch((err) => {
        console.log(err);
      });
  }, [propertyId.id]);
  const handleImageClick = (index) => {
    // Remove focus from previously clicked images
    const previousImages = document.querySelectorAll(".additional-image.focus");
    if (previousImages) {
      previousImages.forEach((image) => {
        image.classList.remove("focus");
      });
    }


    // Add focus to the clicked image
    const clickedImage = document.querySelectorAll(
      ".additional-image:not(.prop-image)"
    )[index];
    if (clickedImage) {
      clickedImage.classList.add("focus");

      // Display the clicked image in the prop-image section
      const propImage = document.querySelector(".prop-image");
      if (propImage) {
        propImage.src = clickedImage.src;
        propImage.alt = clickedImage.alt;
      }
    }
  };
  return (
    <Container fluid>
      <h1>Property Detail</h1>

      <Row>
        <Col>
          {propertyInfo && (
            <div>
              <Card>
                <div className="prop-image-container">
                  <Image
                    className="prop-image"
                    src={propertyInfo.thumbnail}
                    alt={propertyInfo.title}
                    thumbnail
                  />
                </div>

                <Card.Title className="display-5 mb-4 text-center">
                  Additional Images
                </Card.Title>
                <Card.Body>
                  {propertyInfo.images && propertyInfo.images.length > 0 ? (
                    <div className="image-thumbnails">
                      {propertyInfo.images.map((image, index) => (
                        <div key={index} className="image-thumbnail">
                          <Image
                            id={`image-${index}`}
                            className="additional-image"
                            src={image}
                            alt={`Image ${index + 1}`}
                            onClick={() => handleImageClick(index)}
                            tabIndex={0}
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}
                </Card.Body>
              </Card>
            </div>
          )}
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="display-5 mb-2">
                {propertyInfo.title}
              </Card.Title>
              <Card.Text className="mb-2">
                <b>Category:</b> {propertyInfo.category}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header> price</Card.Header>
            <Card.Body>
              <Card.Text>${propertyInfo.price}</Card.Text>
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
                        <th># of Units</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Sacramento, CA 95823</td>
                        <td>lorem sph</td>
                        <td>lorem sph</td>
                        <td>Otto</td>
                      </tr>
                    </tbody>
                  </Table>
                </Tab>
                <Tab eventKey="basic information" title="Basic Information">
                  <Table striped>
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>markotto@example.com</td>
                        <td>555-555-5555</td>
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

          <Card>
            <Card.Header>Location:</Card.Header>
            <Card.Body>
              <Card.Title>City Name :</Card.Title>
              <Card.Title>Streat Name :</Card.Title>
            </Card.Body>
          </Card>

          <h5 className="mt-4">Reviews:</h5>
          <ReviewsList />
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyView;
