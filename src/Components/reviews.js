import React, { useState, useEffect } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, addReview, editReview, deleteReview } from '../MyStore/actions/reviews';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../pages/css/reviewsList.css';
import LoadingScreen from './../pages/loadingScreen';
import { Modal, Button, Form } from 'react-bootstrap';

function ReviewsList() {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews.reviews);
  const isLoading = useSelector(state => state.reviews.loading);
  const error = useSelector(state => state.reviews.error);
  const [reviewId, setReviewId] = useState(null);
  const [formData, setFormData] = useState({ title: '', rating: '', content: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const handleAddReview = () => {
    setShowAddModal(true);
  };

  const handleEditReview = (review) => {
    setReviewId(review.id);
    setFormData({ title: review.title, rating: review.rating, content: review.content });
    setShowEditModal(true);
  };

  const handleDeleteReview = (review) => {
    setReviewId(review.id);
    setShowDeleteModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setFormData({ title: '', rating: '', content: '' });
    setFormErrors({});
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setFormData({ title: '', rating: '', content: '' });
    setFormErrors({});
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddReviewSubmit = () => {
    if (validateForm()) {
      dispatch(addReview(formData));
      setShowAddModal(false);
      setFormData({ title: '', rating: '', content: '' });
      setFormErrors({});
    }
  };

  const handleEditReviewSubmit = () => {
    if (validateForm()) {
      dispatch(editReview(reviewId, formData));
      setShowEditModal(false);
      setFormData({ title: '', rating: '', content: '' });
      setFormErrors({});
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    if (!formData.content.trim()) {
      errors.content = 'Content is required';
    }
    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      errors.rating = 'Rating must be between 1 and 5';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="star" style={{ color: '#f39c12' }} />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="star" style={{ color: '#ccc' }} />);
      }
    }
    return stars;
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      {error && <p>{error}</p>}
      {!isLoading && !error && (
        <div>
          <button className="btn btn-primary" onClick={handleAddReview}>
            <FontAwesomeIcon icon={faPlus} /> Add New Review
          </button>
          {reviews.length === 0 ? (
            <p className="no-reviews">No reviews available at the moment.</p>
          ) : (
            reviews.map(review => (
              <div key={review.id} className="review-container mt-4">
                <div className="review-header">
                  <h2 className="review-title">{review.title}</h2>
                  <p className="review-date">{formatDate(review.created_at)}</p>
                </div>
                <p className="review-rating">{renderStars(review.rating)}</p>
                <p className="review-content">{review.content}</p>
                <p className="review-user">User ID: {review.user}</p>
                <p className="review-property">Property ID: {review.property}</p>

                {/* action buttons */}
                <div className="review-actions">
                  <button className="btn btn-info" onClick={() => handleEditReview(review)}>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDeleteReview(review)}>
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </div>

              </div>
            ))
          )}
        </div>
      )}

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={handleCloseAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleFormChange} placeholder="Enter title" />
              {formErrors.title && <span className="text-danger">{formErrors.title}</span>}
            </Form.Group>
            <Form.Group controlId="formRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control type="number" name="rating" value={formData.rating} onChange={handleFormChange} placeholder="Enter rating" />
              {formErrors.rating && <span className="text-danger">{formErrors.rating}</span>}
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" name="content" value={formData.content} onChange={handleFormChange} rows={3} placeholder="Enter content" />
              {formErrors.content && <span className="text-danger">{formErrors.content}</span>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddReviewSubmit}>
            Save Review
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleFormChange} placeholder="Enter title" />
              {formErrors.title && <span className="text-danger">{formErrors.title}</span>}
            </Form.Group>
            <Form.Group controlId="formRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control type="number" name="rating" value={formData.rating} onChange={handleFormChange} placeholder="Enter rating" />
              {formErrors.rating && <span className="text-danger">{formErrors.rating}</span>}
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" name="content" value={formData.content} onChange={handleFormChange} rows={3} placeholder="Enter content" />
              {formErrors.content && <span className="text-danger">{formErrors.content}</span>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditReviewSubmit}>
            Update Review
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this review?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => { dispatch(deleteReview(reviewId)); setShowDeleteModal(false); }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReviewsList;
