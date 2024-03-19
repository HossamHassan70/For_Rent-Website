import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingScreen from '../pages/loadingScreen';
import Pagination from 'react-js-pagination';
import '../pages/css/propertiesList.css';

const PropertiesPage = () => {
    const location = useLocation();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [propertiesPerPage] = useState(10);
    const type = new URLSearchParams(location.search).get('type');

    useEffect(() => {
        if (type) {
            axios.get(`http://localhost:8000/properties?type=${type}`)
                .then(response => {
                    setProperties(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching properties:', error);
                    setLoading(false);
                });
        }
    }, [type]);

    // Logic to get current properties
    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

    // Handle page change
    const handlePageChange = pageNumber => setCurrentPage(pageNumber);

    if (loading) {
        return <LoadingScreen />;
    }

    if (currentProperties.length === 0) {
        return (
            <Container fluid className='mt-5'>
                <Row>
                    <Col className="text-center">
                        <h3>No properties found for type {type && type.toUpperCase()}</h3>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container fluid className='mt-5'>
            <Row>
                <Col className="text-center">
                    <h3 className='mb-2'><b>PROPERTIES - {type && type.toUpperCase()}</b></h3>
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Row>
                        {currentProperties.map(property => (
                            <Col key={property.id} xs={12} md={6} lg={6} className="mb-3">
                                <Card className='mb-3'>
                                    <Card.Body>
                                        <Row>
                                            <Col xs={12} md={6}>
                                                <div className="card-img-container position-relative">
                                                    <img className='prop-image' src={property.image} alt={property.title} />
                                                    <div className="favorites-icon position-absolute">
                                                        <i className="far fa-heart text-light"></i>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs={12} md={6}>
                                                <Card.Title className='mt-2 prop-title d-flex justify-content-between'>
                                                    <span>{property.title}</span>
                                                    <span>55408</span>
                                                </Card.Title>
                                                <Card.Text className='price d-flex justify-content-between'>
                                                    <span>Price: ${property.price}</span>
                                                    <span>7.25% CAP</span>
                                                </Card.Text>
                                                <Card.Text className='mx-2 since'>4 days ago</Card.Text>
                                                <Link to={`/property/${property.id}`}>
                                                    <button className='btn more-details'><b>More Details</b></button>
                                                </Link>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div className='d-flex justify-content-center'>
                        <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={propertiesPerPage}
                            totalItemsCount={properties.length}
                            pageRangeDisplayed={5}
                            onChange={handlePageChange}
                            itemClass="page-item"
                            linkClass="page-link"
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default PropertiesPage;