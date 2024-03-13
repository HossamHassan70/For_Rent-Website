import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Pagination,
  Form,
  Button,
  Modal,
  Badge,
} from "react-bootstrap";

const OwnerProperties = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertyId, setPropertyId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editPropertyData, setEditPropertyData] = useState(null);
  const propertiesPerPage = 8;
  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  const handleCloseConfirmation = () => setShowConfirmation(false);
  const [formErrors, setFormErrors] = useState({});

  const handleShowConfirmation = (id) => {
    setPropertyId(id);
    setShowConfirmation(true);
  };
  const handleCloseForm = () => {
    setShowForm(false);
    setEditPropertyData(null);
  };
  const handleShowForm = (id) => {
    const property = properties.find((property) => property.id === id);
    setEditPropertyData(property);
    setShowForm(true);
  };

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
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
        handleCloseConfirmation();
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
        handleCloseForm();
      })
      .catch((error) => console.error(error));
  };

  const addProperty = (newProperty) => {
    axios
      .post("https://dummyjson.com/products/add", newProperty)
      .then((response) => {
        setProperties((properties) => [...properties, response.data]);
        handleCloseForm();
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
    const updatedProperty = {
      title: form.title.value,
      brand: form.brand.value,
      price: form.price.value,
      category: form.category.value,
      description: form.description.value,
    };

    if (editPropertyData) {
      editProperty(editPropertyData.id, updatedProperty);
    } else {
     addProperty(updatedProperty);
    }
  };
  

  return (
    <Container>
        <h1>
        <Badge bg="primary">My Properties</Badge>
      </h1>
      <Table striped bordered hover>
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
              <td> <Badge variant="primary">{property.category}</Badge></td>
              <td>{property.description}</td>
              <td>
      <Button variant="success" onClick={() => setShowForm(true)}>
        Add
      </Button>
                <Button
                  variant="primary"
                  onClick={() => handleShowForm(property.id)}
                >
                  Edit
                </Button>{" "}
              
                <Button
                  variant="danger"
                  onClick={() => handleShowConfirmation(property.id)}
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

     
      <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this property?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmation}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteProperty(propertyId)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

     
      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editPropertyData ? "Edit Property" : "Add Property"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                defaultValue={editPropertyData ? editPropertyData.title : ""}
                required
              />
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                defaultValue={editPropertyData ? editPropertyData.brand : ""}
                required
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                defaultValue={editPropertyData ? editPropertyData.price : ""}
                required
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                defaultValue={editPropertyData ? editPropertyData.category : ""}
                required
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                defaultValue={
                  editPropertyData ? editPropertyData.description : ""
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editPropertyData ? "Save Changes" : "Add Property"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default OwnerProperties;