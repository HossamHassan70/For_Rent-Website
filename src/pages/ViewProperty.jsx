import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Tab, Tabs, Table, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./css/ViewProperty.css";
import ReviewsList from "../Components/reviews";
import { jwtDecode } from "jwt-decode";

const PropertyView = () => {
  const { id } = useParams();
  const [propertyInfo, setPropertyInfo] = useState({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const tk = sessionStorage.getItem("refreshToken");
    if (tk) {
      try {
        const decodedToken = jwtDecode(tk);
        const uid = decodedToken.user.id;
        setUserId(uid);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    axios.get(`http://localhost:8000/properties/${id}`)
      .then((res) => {
        setPropertyInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <Container fluid>
      <h1 className="my-properties-heading">
        <Badge bg="secondary"> Property Detail</Badge>
      </h1>
      <Row>
        <Col className="view-card">
          {propertyInfo && (
            <div className="view-card">
              <Card>
                <Card.Body>
                  <Card.Img variant="top" src={propertyInfo.image} />
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title className="mb-2">
                    <b>Descreption:</b> {propertyInfo.description}
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
          )}
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title className="price-card">
                {propertyInfo.title}
              </Card.Title>

            </Card.Body>
          </Card>
          <Card className="price-card">
            <Card.Title > Price</Card.Title>

            ${propertyInfo.price}
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
