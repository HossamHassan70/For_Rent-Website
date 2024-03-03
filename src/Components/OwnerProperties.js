import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Pagination, Form, Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';

const OwnerProperties = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertyId, setPropertyId] = useState(null);
  const propertiesPerPage = 8;
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products')
      .then((response) => {
        const data = response.data;
        setProperties(data.products);
      })
      .catch((error) => console.error(error));
  }, []);

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  const deleteProperty = (id) => {
    axios
      .delete(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProperties(properties.filter((property) => property.id !== id));
      })
      .catch((error) => console.error(error));
  };

  const editProperty = (id, updatedProperty) => {
    axios
      .put(`https://dummyjson.com/products/${id}`, updatedProperty)
      .then((response) => {
        setProperties((properties) =>
          properties.map((property) => {
            if (property.id === id) {
              return { ...property, ...updatedProperty };
            }
            return property;
          })
        );
      })
      .catch((error) => console.error(error));
  };

  const addProperty = (newProperty) => {
    axios
      .post('https://dummyjson.com/products/add', newProperty)
      .then((response) => {
        setProperties((properties) => [...properties, response.data]);
      })
      .catch((error) => console.error(error));
  };

  const renderPaginationItems = () => {
    return getPaginationItems().map((pageNumber) => (
      <Pagination.Item
        key={pageNumber}
        active={pageNumber === currentPage}
        onClick={() => paginate(pageNumber)}
      >
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const newProperty = {
      id: Date.now(), 
      title: form.title.value,
      brand: form.brand.value,
      price: form.price.value,
      category: form.category.value,
      description: form.description.value,
    };
    addProperty(newProperty);
    form.reset();
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const id = propertyId;
    const updatedPropertyData = {
      title: form.title.value,
      brand: form.brand.value,
      price: form.price.value,
      category: form.category.value,
      description: form.description.value,
    };
    editProperty(id, updatedPropertyData);
    setPropertyId(null);
    form.reset();
  };

  const handleEdit = (property) => {
    setPropertyId(property.id);
    const form = document.getElementById('propertyForm');
    form.title.value = property.title;
    form.brand.value = property.brand;
    form.price.value = property.price;
    form.category.value = property.category;
    form.description.value = property.description;
  };

  return (
    <Container>
      <h1>
        <Badge bg="primary">My Properties</Badge>
      </h1>
      <div>
        <Table striped bordered hover variant="light">
          <thead>
            <tr>
              <th>Title</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProperties.map((property) => (
              <tr key={property.id}>
                <td>{property.title}</td>
                <td>{property.brand}</td>
                <td>{property.price}</td>
               <td><Badge variant="primary">{property.category}</Badge></td>
                <td>{property.description}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => handleEdit(property)}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    variant="danger"
                    onClick={() => deleteProperty(property.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          <Pagination.Prev onClick={handlePrevClick} />
          {renderPaginationItems()}
          <Pagination.Next onClick={handleNextClick} />
        </Pagination>
        <h1>
        <Badge bg="primary">Add/Edit Property</Badge>
</h1>

        <Form id="propertyForm" onSubmit={propertyId ? handleUpdate : handleSubmit }>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" placeholder="Enter title" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBrand">
            <Form.Label>Brand</Form.Label>
            <Form.Control type="text" name="brand" placeholder="Enter brand" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" placeholder="Enter price" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" name="category" placeholder="Enter category" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" name="description" placeholder="Enter description" />
          </Form.Group>
          <Button variant="primary" type="submit">
            {propertyId ? 'Update Property' : 'Add Property'}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default OwnerProperties;