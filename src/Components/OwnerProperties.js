import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Pagination } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const OwnerProperties = () => {
    const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const propertiesPerPage = 8;
    useEffect(() => {
        axios.get('https://dummyjson.com/products')
            .then(response => {
                const data = response.data;
                setProperties(data.products); 
            })
            .catch(error => console.error(error));
    }, []);
    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <div>
            <Container className="d-flex flex-column align-items-center mt-5" style={{ height: '100vh' }}>
                <Table striped bordered hover style={{ width: '80%' }}>
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
                                    <i className="bi bi-pencil" style={{ marginRight: '8px', cursor: 'pointer' }}></i>
                                    <i className="bi bi-trash" style={{ cursor: 'pointer' }}></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-flex justify-content-end">
                    <Pagination>
                        {Array.from({ length: Math.ceil(properties.length / propertiesPerPage) }).map((_, index) => (
                            <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </div>
            </Container>
        </div>
    );
};

export default OwnerProperties;
