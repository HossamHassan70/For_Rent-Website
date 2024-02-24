import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Pagination } from 'react-bootstrap';

const OwnerProperties = () => {
    const [properties, setProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const propertiesPerPage = 8;
    const totalPages = Math.ceil(properties.length / propertiesPerPage);
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
    const getPaginationItems = () => {
        const pageNumbers = [];
        const maxPagesToShow = 3;

        const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
        let startPage = Math.max(1, currentPage - halfMaxPagesToShow);
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (totalPages <= maxPagesToShow) {
            startPage = 1;
            endPage = totalPages;
        } else if (currentPage <= halfMaxPagesToShow) {
            endPage = maxPagesToShow;
        } else if (currentPage >= totalPages - halfMaxPagesToShow) {
            startPage = totalPages - maxPagesToShow + 1;
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };
    const renderPaginationItems = () => {
        return getPaginationItems().map((pageNumber, index) => (
            <Pagination.Item key={index + 1} active={pageNumber === currentPage} onClick={() => paginate(pageNumber)}>
                {pageNumber}
            </Pagination.Item>
        ));
    };

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };


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
                <div className='d-flex justify-content-end'>
                    <Pagination>
                        <Pagination.Prev onClick={handlePrevClick} />
                        {renderPaginationItems()}
                        <Pagination.Next onClick={handleNextClick} />
                    </Pagination>
                </div>
            </Container>
        </div>
    );
};

export default OwnerProperties;