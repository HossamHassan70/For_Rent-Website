import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Container, Row } from 'react-bootstrap';
import '../pages/css/propertiesList.css';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';
import LoadingScreen from '../pages/loadingScreen';

const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
};

const SearchResults = () => {
    const { results, loading, error } = useSelector(state => state.search);
    console.log(results)
    if (loading) {
        return <LoadingScreen />;
    }

    if (error) {
        return <div className='error-page text-danger'>{error}</div>;
    }

    if (!results || results.length === 0) {
        return <div className="no-properties">Sorry, no properties matched your search.</div>;
    }

    return (
        <Container fluid className='mt-5'>
            <h3 className='mb-2'><b><span style={{ color: '#008f97' }}>SEARCH</span> RESULTS</b></h3>
            <Row>
                {results.map(product => (
                    <Col key={product.id} xs={12} lg={6}>
                        <Card className='mb-3'>
                            <Card.Body>
                                <Row>
                                    <Col xs={12} md={6}>
                                        <div className="card-img-container position-relative">
                                            <img className='prop-image' src={product.image} alt={product.title} />
                                        </div>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Card.Title className='mt-2 prop-title d-flex justify-content-between'>
                                            <span>{product.title}</span>
                                            {/* <span>55408</span> */}
                                            <span style={{ color: product.availability ? 'green' : 'red' }}>
                                                {product.availability ? 'Available' : 'Rented'}
                                            </span>
                                        </Card.Title>
                                        <Card.Text className='price d-flex justify-content-between'>
                                            <span>Price: ${product.price}</span>
                                            {/* <span>7.25% CAP</span> */}
                                            <span>Address: {product.address}</span>
                                        </Card.Text>
                                        <Card.Text >{formatDate(product.created_at)}</Card.Text>
                                        <Link to={`/property/${product.id}`}>
                                            <button className='btn more-details'><b>More Details</b></button>
                                        </Link>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>))}
            </Row>
        </Container>
    );
};

export default SearchResults;
