import React, { useState, useEffect } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, addReview, editReview, deleteReview } from '../MyStore/actions/reviews';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import LoadingScreen from './../pages/loadingScreen';
import { Modal, Button, Form } from 'react-bootstrap';
import RatingMeter from './ratingMeter';
import '../pages/css/reviews.css';
import { Alert } from 'react-bootstrap';

function ReviewsList({ userId, propertyId }) {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews.reviews);
  const isLoading = useSelector(state => state.reviews.loading);
  const error = useSelector(state => state.reviews.error);
  const [reviewId, setReviewId] = useState(null);
  const [formData, setFormData] = useState({ title: '', rating: '', content: '' });
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [modalMode, setModalMode] = useState('add');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const handleAddReview = () => {
    if (!userId) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
      return;
    }
    const userReview = reviews.find(review => review.user === userId);
    if (userReview) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
      return;
    }
    setModalMode('add');
    setShowModal(true);
  };

  const handleEditReview = (review) => {
    setModalMode('edit');
    setReviewId(review.id);
    setFormData({ title: review.title, rating: review.rating, content: review.content });
    setShowModal(true);
  };

  const handleDeleteReview = (review) => {
    setReviewId(review.id);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ title: '', rating: '', content: '' });
    setFormErrors({});
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      if (modalMode === 'add') {
        dispatch(addReview({ ...formData, user: userId, property: propertyId }));
      } else if (modalMode === 'edit') {
        dispatch(editReview(reviewId, { ...formData, user: userId, property: propertyId }));
      }
      setShowModal(false);
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
        <>
          {reviews.length === 0 ? (
            <p className="text-center no-reviews mt-4">No reviews available at the moment.</p>
          ) : (
            <>
              {/* Render user's review first */}
              {showAlert && (
                <Alert variant="danger" >
                  {userId ? 'You have already reviewed this property.' : 'Please log in first to add a review.'}
                </Alert>
              )}
              {userId && reviews.some(review => review.user === userId) && (
                reviews
                  .filter(review => review.user === userId)
                  .map(review => (
                    <div key={review.id} className="review-container mt-4">
                      <div className="review-header">
                        <h2 className="review-title">{review.title}</h2>
                        <p className="review-date">{formatDate(review.created_at)}</p>
                      </div>
                      <p className="review-rating">{renderStars(review.rating)}</p>
                      <p className="review-content">{review.content}</p>
                      <p className="review-user">User ID: {review.user} (test)</p>
                      <p className="review-property">Property ID: {review.property} (test)</p>

                      {/* Action buttons */}
                      <div className="review-actions">
                        {userId === review.user && (
                          <>
                            <button className="mx-2 btn btn-info" onClick={() => handleEditReview(review)}>
                              <FontAwesomeIcon icon={faEdit} /> Edit
                            </button>
                            <button className="mx-2 btn btn-danger" onClick={() => handleDeleteReview(review)}>
                              <FontAwesomeIcon icon={faTrash} /> Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))
              )}

              {/* Render other reviews */}
              {reviews
                .filter(review => !(review.user === userId))
                .map(review => (
                  <div key={review.id} className="review-container mt-4">
                    <div className="review-header">
                      <h2 className="review-title">{review.title}</h2>
                      <p className="review-date">{formatDate(review.created_at)}</p>
                    </div>
                    <p className="review-rating">{renderStars(review.rating)}</p>
                    <p className="review-content">{review.content}</p>
                    <p className="review-user">User ID: {review.user} (test)</p>
                    <p className="review-property">Property ID: {review.property} (test)</p>

                    {/* Action buttons */}
                    <div className="review-actions">
                      {userId === review.user && (
                        <>
                          <button className="mx-2 btn btn-info" onClick={() => handleEditReview(review)}>
                            <FontAwesomeIcon icon={faEdit} /> Edit
                          </button>
                          <button className="mx-2 btn btn-danger" onClick={() => handleDeleteReview(review)}>
                            <FontAwesomeIcon icon={faTrash} /> Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              }
            </>
          )}
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={handleAddReview}>
              <FontAwesomeIcon icon={faPlus} /> Add Review
            </button>
          </div>
        </>
      )}

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>

        <Modal.Header closeButton>
          <Modal.Title>{modalMode === 'add' ? 'Add New Review' : 'Edit Review'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label><b>Title</b></Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleFormChange} placeholder="Enter title" />
              {formErrors.title && <span className="text-danger">{formErrors.title}</span>}
            </Form.Group>

            <Form.Group className='mt-3' controlId="formRating">
              <RatingMeter value={formData.rating} onChange={(value) => handleFormChange({ target: { name: 'rating', value } })} />
              {formErrors.rating && <span className="text-danger">{formErrors.rating}</span>}
            </Form.Group>

            <Form.Group className='mt-3' controlId="formContent">
              <Form.Label><b>Content</b></Form.Label>
              <Form.Control as="textarea" name="content" value={formData.content} onChange={handleFormChange} rows={3} placeholder="Enter content" />
              {formErrors.content && <span className="text-danger">{formErrors.content}</span>}
            </Form.Group>
            <Form.Control type="hidden" name="user" value={userId} />
            <Form.Control type="hidden" name="property" value={propertyId} />
          </Form>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            {modalMode === 'add' ? 'Save Review' : 'Update Review'}
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
