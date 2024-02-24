import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Pagination } from 'react-bootstrap';

const OwnerProperties = () => {
    const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const propertiesPerPage = 8;
    const [selectedCategory, setSelectedCategory] = useState(null);

    const groupPropertiesByCategory = (allProperties) => {
        const groupedProperties = {};
        allProperties.forEach(property => {
            const category = property.category;
            if (!groupedProperties[category]) {
                groupedProperties[category] = [];
            }
            groupedProperties[category].push(property);
        });
        return groupedProperties;
    };

    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const shufflePropertiesWithinCategories = (groupedProperties) => {
        const shuffledProperties = {};
        for (const category in groupedProperties) {
            shuffledProperties[category] = shuffleArray(groupedProperties[category]);
        }
        return Object.values(shuffledProperties).flat();
    };

    useEffect(() => {
        axios.get('https://dummyjson.com/products?limit=100')
            .then(response => {
                const data = response.data;
                const groupedProperties = groupPropertiesByCategory(data.products);
                const categories = Object.keys(groupedProperties);
                const randomCategory = categories[Math.floor(Math.random() * categories.length)];
                const shuffledProperties = shufflePropertiesWithinCategories(groupedProperties);
                setProperties(shuffledProperties);
                setSelectedCategory(randomCategory);
            })
            .catch(error => console.error(error));
    });

    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = selectedCategory
        ? properties.filter(property => property.category === selectedCategory).slice(indexOfFirstProperty, indexOfLastProperty)
        : [];

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Owner</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProperties.map((property) => (
                            <tr key={property.id}>
                                <td>{property.title}</td>
                                <td>{property.brand}</td>
                                <td>{property.price}</td>
                                <td>{property.category}</td>
                                <td>{property.description}</td>
                                <td>
                                    <i className="mx-2 fas fa-pen"></i>
                                    <i className="fas fa-trash"></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {currentProperties.length > propertiesPerPage && (
                    <div className="d-flex justify-content-end">
                        <Pagination>
                            {Array.from({ length: Math.ceil(currentProperties.length / propertiesPerPage) }).map((_, index) => (
                                <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default OwnerProperties;