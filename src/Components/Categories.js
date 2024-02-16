import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CategoryList from './CategoryList';

const Categories = () => {
  const popularSearches = [
    'Apartments for rent in Egypt',
    'Apartment for sale in Egypt',
    'Houses for rent in Egypt',
    'Houses for sale in Egypt',
    'Land for sale in Egypt',
    'Property for sale in Egypt',
  ];

  const popularAreas = [
    'Apartments for rent in Cairo',
    'Apartments for sale in Cairo',
    'Apartments for sale in New Cairo',
    'Apartments for rent in New Cairo',
    'Villas for rent in Gouna',
    'Apartment for rent Zamalek',
    'Katameya Heights Villas',
  ];

  const trendingAreas = [
    'Villa for rent in New Cairo',
    'Villa for sale in New Cairo',
    'Apartments for rent in Maadi',
    'Apartments for sale in Maadi',
    'Apartments for rent in Alexandria',
    'Apartments for sale in Alexandria',
  ];

  const trendingSearches = [
    'Studios for rent in Cairo',
    'Al Rehab city Apartments for sale',
    'Madinaty Villa for sale',
    'Apartments for sale in Hurghada',
    'Rent in Marassi North Coast',
    'Rent in North Coast Egypt',
    'Commercial properties for sale',
  ];

  return (
    <Container className="mt-5">
      <style>
        {`
          .category-link {
            text-decoration: none;
            color: #3b97ba;
            transition: border-bottom 0.3s ease;
          }

          .category-link:hover {
            border-bottom: 1px solid #3b97ba;
          }
        `}
      </style>
      <Row>
        <Col md={6} lg={3} className="text-start">
          <CategoryList title="POPULAR SEARCHES" items={popularSearches} />
        </Col>
        <Col md={6} lg={3} className="text-start">
          <CategoryList title="POPULAR AREAS" items={popularAreas} />
        </Col>
        <Col md={6} lg={3} className="text-start">
          <CategoryList title="TRENDING AREAS" items={trendingAreas} />
        </Col>
        <Col md={6} lg={3} className="text-start">
          <CategoryList title="TRENDING SEARCHES" items={trendingSearches} />
        </Col>
      </Row>
    </Container>
  );
};

export default Categories;