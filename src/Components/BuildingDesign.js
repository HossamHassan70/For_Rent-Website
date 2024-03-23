import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './BuildingDesign.css';

import houseBuildingImage from '../images/house1.jpg';
import apartmentBuildingImage from '../images/apartment1.jpg';
import villaBuildingImage from '../images/villa1.jpg';
import condaBuildingImage from '../images/conda1.jpg';

const BuildingDesign = () => {
  return (
    <Container fluid className='mt-5'>
      <h3><b>WHAT ARE We<span style={{ color: '#008f97' }}> SELLING</span></b></h3>
      <Row className="building-grid">
        <Col xs={6} sm={3} className="building-item">
          <Link to="/properties?type=house">
            <Image src={houseBuildingImage} alt="House Building" fluid />
          </Link>
          <div className="building-text">
            <p><strong>HOUSE</strong></p>
          </div>
        </Col>
        <Col xs={6} sm={3} className="building-item">
          <Link to="/properties?type=apartment">
            <Image src={apartmentBuildingImage} alt="Apartment Building" fluid />
          </Link>
          <div className="building-text">
            <p><strong>APARTMENT</strong></p>
          </div>
        </Col>
        <Col xs={6} sm={3} className="building-item">
          <Link to="/properties?type=villa">
            <Image src={villaBuildingImage} alt="Villa Building" fluid />
          </Link>
          <div className="building-text">
            <p><strong>VILLA</strong></p>
          </div>
        </Col>
        <Col xs={6} sm={3} className="building-item">
          <Link to="/properties?type=condo">
            <Image src={condaBuildingImage} alt="Condo Building" fluid />
          </Link>
          <div className="building-text">
            <p><strong>CONDO</strong></p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BuildingDesign;