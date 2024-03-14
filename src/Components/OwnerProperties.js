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
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const propertiesPerPage = 8;
  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  const handleCloseConfirmation = () => setShowConfirmation(false);
  const handleCloseSuccessModal = () => setShowSuccessModal(false);

  const handleShowConfirmation = (id) => {
    setPropertyId(id);
    setShowConfirmation(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditPropertyData(null);
    setFormErrors({});
  };

  const handleShowForm = (id) => {
    const property = properties.find((property) => property.id === id);
    setEditPropertyData(property);
    setShowForm(true);
    setFormErrors({});
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
        setShowSuccessModal(true);
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
      editProperty(editPropertyData.id,updatedProperty);
    } else {
      addProperty(updatedProperty);
    }
  };

  const validateForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const errors = {};

    if (!form.title.value) {
      errors.title = "Title is required";
    }

    if (!form.brand.value) {
      errors.brand = "Brand is required";
    }

    if (!form.price.value) {
      errors.price = "Price is required";
    } else if (isNaN(form.price.value)) {
      errors.price = "Price must be a number";
    }

    if (!form.category.value) {
      errors.category = "Category is required";
    }

    if (!form.description.value) {
      errors.description = "Description is required";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      handleSubmit(event);
    }
  };

  return (
    <Container>
     <h1><Badge >Owner Properties</Badge></h1>
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
      <Button variant="success" onClick={() => setShowForm(true)}>
        Add New Property
      </Button>
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
          <Button variant="danger" onClick={() => deleteProperty(propertyId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>{editPropertyData ? "Edit" : "Add"} Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={validateForm}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                defaultValue={editPropertyData ? editPropertyData.title : ""}
              />
              {formErrors.title && (
                <Badge bg="danger">{formErrors.title}</Badge>
              )}
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                defaultValue={editPropertyData ? editPropertyData.brand : ""}
              />
              {formErrors.brand && (
                <Badge bg="danger">{formErrors.brand}</Badge>
              )}
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                defaultValue={editPropertyData ? editPropertyData.price : ""}
              />
              {formErrors.price && (
                <Badge bg="danger">{formErrors.price}</Badge>
              )}
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                defaultValue={editPropertyData ? editPropertyData.category : ""}
              />
              {formErrors.category && (
                <Badge bg="danger">{formErrors.category}</Badge>
              )}
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
              {formErrors.description && (
                <Badge bg="danger">{formErrors.description}</Badge>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              {editPropertyData ? "Save Changes" : "Add Property"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Property Added Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Congratulations! The property has been added successfully.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OwnerProperties;