import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '../MyStore/actions/fetchProperties';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import LoadingScreen from './loadingScreen'
import './propertiesList.css';

const PropertiesList = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.properties.error);
  const loading = useSelector((state) => state.properties.loading);
  const properties = useSelector((state) => state.properties.properties.products);
  // console.log(properties)
  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <LoadingScreen />
      </>
    );
  }

  if (error) {
    return <div className='error-page text-danger'>{error}</div>;
  }

  if (!properties) {
    return <div>No properties found.</div>;
  }

  return (
    <Container fluid className='mt-3'>
      <h1 className='mb-2'><span className='text-info'>Properties</span> List</h1>
      <Row>
        {properties.map(product => (
          <Col key={product.id} md={12} lg={6}>

            <Card className='mb-3'>
              <Card.Body>
                <Row>

                  <Col xs={6}>
                    <div className="card-img-container position-relative">
                      <img className='prop-image' src={product.thumbnail} alt={product.title} />
                      <div className="favorites-icon position-absolute">
                        <i className="far fa-heart text-light"></i>
                      </div>
                    </div>
                  </Col>

                  <Col xs={6}>
                    <Card.Title className='prop-title'>{product.title}</Card.Title>
                    <hr className='my-2' />
                    <Card.Text className='mb-3'>Brand: {product.brand}</Card.Text>
                    <Card.Text className='mb-3'>Price: {product.price} EGP</Card.Text>
                    <Card.Text className='mb-3'>Rating: {product.rating} <i className="fas fa-star text-warning"></i></Card.Text>
                    <Button variant="outline-info" size="sm">More Details</Button>
                  </Col>

                </Row>
              </Card.Body>
            </Card>

          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PropertiesList;
