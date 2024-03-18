import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Pagination,
  Form,
  Button,
  Modal,
  Badge,
  Card,
  ListGroup,
} from "react-bootstrap";
import "./OwnerProperties.css";

const OwnerProperties = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertyId, setPropertyId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editPropertyData, setEditPropertyData] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [image, setImage] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users/');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const propertiesPerPage = 8;
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  const handleCloseConfirmation = () => setShowConfirmation(false);
  const handleCloseSuccessModal = () => setShowSuccessModal(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImage1Change = (e) => {
    setImage1(e.target.files[0]);
  };

  const handleImage2Change = (e) => {
    setImage2(e.target.files[0]);
  };

  const handleImage3Change = (e) => {
    setImage3(e.target.files[0]);
  };

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
      .get("http://localhost:8000/properties/")
      .then((response) => {
        setProperties(response.data);
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
      .delete(`http://localhost:8000/properties/${id}/`)
      .then((response) => {
        setProperties(properties.filter((property) => property.id !== id));
        handleCloseConfirmation();
      })
      .catch((error) => console.error(error));
  };

  const editProperty = (id, formData) => {
    axios
      .put(`http://localhost:8000/properties/${id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        setProperties((properties) =>
          properties.map((property) => {
            if (property.id === id) {
              return response.data;
            }
            return property;
          })
        );
        handleCloseForm();
      })
      .catch((error) => console.error(error));
  };

  const addProperty = async (formData) => {
    try {
      const response = await axios.post("http://localhost:8000/properties/", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setProperties((properties) => [...properties, response.data]);
      handleCloseForm();
      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
    }
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

  const handleSubmit = async (event) => {
    const form = event.target;
    const formData = new FormData(form);
    formData.append("image", image);
    formData.append("title", form.title.value);
    formData.append("address", form.address.value);
    formData.append("price", form.price.value);
    formData.append("type", form.type.value);
    formData.append("description", form.description.value);
    formData.append("rooms", form.rooms.value);
    formData.append("bathrooms", form.bathrooms.value);
    formData.append("owner", form.owner.value);
    formData.append("availability", form.availability.value);
    if (image1) {
      formData.append("image1", image1);
    }
    if (image2) {
      formData.append("image2", image2);
    }
    if (image3) {
      formData.append("image3", image3);
    }

    if (editPropertyData) {
      editProperty(editPropertyData.id, formData);
    } else {
      addProperty(formData);
    }
  };

  const validateForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const errors = {};

    if (!form.title.value) {
      errors.title = "Title is required";
    }

    if (!form.address.value) {
      errors.address = "Brand is required";
    }

    if (!form.price.value) {
      errors.price = "Price is required";
    } else if (isNaN(form.price.value)) {
      errors.price = "Price must be a number";
    }

    if (!form.type.value) {
      errors.type = "Type is required";
    }

    if (!form.description.value) {
      errors.description = "Description is required";
    }

    if (!form.rooms.value) {
      errors.rooms = "Rooms is required";
    } else if (isNaN(form.rooms.value)) {
      errors.rooms = "Rooms must be a number";
    } else if (parseInt(form.rooms.value) < 1) {
      errors.rooms = "Rooms must be 1 or more";
    }

    if (!form.bathrooms.value) {
      errors.bathrooms = "Bathrooms is required";
    } else if (isNaN(form.bathrooms.value)) {
      errors.bathrooms = "Bathrooms must be a number";
    } else if (parseInt(form.bathrooms.value) < 1) {
      errors.bathrooms = "Bathrooms must be 1 or more";
    }
    if (!form.owner.value) {
      errors.owner = "Owner is required";
    }

    if (!form.availability.value) {
      errors.availability = "availability is required";
    }
    if (!form.image.value) {
      errors.image = "Please select an image";
    }


    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      handleSubmit(event);
    }
  };

  return (
    <Container>
      <h1 className="my-properties-heading">
        <Badge bg="secondary">  My Properties</Badge>
      </h1>      <div className="card-container">
        {currentProperties.map((property) => (
          <Card key={property.id} className="property-card">
            <Card.Img variant="top" src={property.image} />
            <Card.Body>
              <Card.Title>{property.title}</Card.Title>
              <Card.Text>
                {property.description}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Address: {property.address}</ListGroup.Item>
              <ListGroup.Item>Price: {property.price}</ListGroup.Item>
              <ListGroup.Item>Rooms: {property.rooms}</ListGroup.Item>
              <ListGroup.Item>Bathrooms: {property.bathrooms}</ListGroup.Item>
            </ListGroup>
            <Card.Body>

              <Button variant="primary" onClick={() => handleShowForm(property.id)}>
                Edit Property
              </Button>{" "}
              <Button variant="danger" onClick={() => handleShowConfirmation(property.id)}>
                Delete Property
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
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
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                defaultValue={editPropertyData ? editPropertyData.address : ""}
              />
              {formErrors.address && (
                <Badge bg="danger">{formErrors.address}</Badge>
              )}
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                defaultValue={editPropertyData ? editPropertyData.price : ""}
              />
              {formErrors.price && (
                <Badge bg="danger">{formErrors.price}</Badge>
              )}
            </Form.Group>
            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                defaultValue={editPropertyData ? editPropertyData.type : ""}
              >
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="villa">Villa</option>
              </Form.Control>
              {formErrors.type && (
                <Badge bg="danger">{formErrors.type}</Badge>
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
            <Form.Group controlId="rooms">
              <Form.Label>rooms</Form.Label>
              <Form.Control
                type="number"
                rows={3}
                defaultValue={
                  editPropertyData ? editPropertyData.rooms : ""
                }
              />
              {formErrors.rooms && (
                <Badge bg="danger">{formErrors.rooms}</Badge>
              )}
            </Form.Group>
            <Form.Group controlId="bathrooms">
              <Form.Label>Bathrooms</Form.Label>
              <Form.Control
                type="number"
                rows={3}
                defaultValue={
                  editPropertyData ? editPropertyData.bathrooms : ""
                }
              />
              {formErrors.bathrooms && (
                <Badge bg="danger">{formErrors.bathrooms}</Badge>
              )}
            </Form.Group>
            <Form.Group controlId="owner">
              <Form.Label>Owner</Form.Label>
              <Form.Select defaultValue={editPropertyData ? editPropertyData.owner : ""}>
                <option value="">Select owner...</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </Form.Select>
              {formErrors.owner && <Badge bg="danger">{formErrors.owner}</Badge>}
            </Form.Group>
            <Form.Group controlId="availability">
              <Form.Label>Availability</Form.Label>
              <Form.Check
                type="checkbox"
              />
              {formErrors.availability && (
                <Badge bg="danger">{formErrors.availability}</Badge>
              )}
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageChange}
              />
              {formErrors.image && <Badge bg="danger">{formErrors.image}</Badge>}
            </Form.Group>

            <Form.Group controlId="image1">
              <Form.Label>Additional Image 1 (Optional)</Form.Label>
              <Form.Control type="file" onChange={handleImage1Change} />
              {formErrors.image1 && <Badge bg="danger">{formErrors.image1}</Badge>}
            </Form.Group>

            <Form.Group controlId="image2">
              <Form.Label>Additional Image 2 (Optional)</Form.Label>
              <Form.Control type="file" onChange={handleImage2Change} />
              {formErrors.image2 && <Badge bg="danger">{formErrors.image2}</Badge>}
            </Form.Group>

            <Form.Group controlId="image3">
              <Form.Label>Additional Image 3 (Optional)</Form.Label>
              <Form.Control type="file" onChange={handleImage3Change} />
              {formErrors.image3 && <Badge bg="danger">{formErrors.image3}</Badge>}
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
      <Button variant="success" onClick={() => setShowForm(true)}>
        Add New Property
      </Button>
    </Container>
  );
};

export default OwnerProperties;