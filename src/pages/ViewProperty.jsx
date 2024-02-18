import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import './ViewProperty.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import afsg from '../images/afsg.png';
import PropertyMapView from '../Components/ PropertyMapView';
import { useNavigate } from 'react-router-dom';

const PropertyView = () => {
  const propertyLocation = [51.5074, -0.1278]; // Replace with your actual property location
  const navigate = useNavigate(); // Add 'useNavigate' hook to enable navigation

  const handleClick = () => {
    navigate('/PropertyMapView', { state: { propertyLocation } });
  };

  return (
    <Container fluid>
      <h1>Property Detail</h1>
      <Row>
        <Col xs={12} md={8}>
          <Image src={afsg} thumbnail />
        </Col>
        <Col xs={6} md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Full Sleeve Sweatshirt for Men (Pink)</Card.Title>
              <Card.Text>Sacramento, CA 95823</Card.Text>
              <Card.Text>$100.00</Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Price</Card.Title>
              <Card.Text>$154854.00</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Header>Property Description:</Card.Header>
            <Card.Body>
              <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example" className="mb-3">
                <Tab eventKey="property overview" title="Property Overview">
                  <Table striped>
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
        </Col>
     <Row>
          <Card>
            <Card.Header>Location</Card.Header>
            <Card.Body>
              <Button onClick={handleClick}>View Property on Map</Button>
              <PropertyMapView />
            </Card.Body>
          </Card>
          </Row>
      </Row>
    </Container>
  );
};

export default PropertyView;