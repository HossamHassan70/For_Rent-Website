import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Badge, Modal, Form } from 'react-bootstrap';
import LoadingScreen from '../pages/loadingScreen';
import { formatDistanceToNow, parseISO } from 'date-fns';

const Requests = () => {
  const [propertyRequests, setPropertyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  // modal states
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("")
  // Acceptance alert
  const [showAlert, setShowAlert] = useState(false);
  // console.log(propertyRequests)

  useEffect(() => {
    const fetchPropertyRequests = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/requests/`, {
        });
        setPropertyRequests(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPropertyRequests();
  }, [page]);

  // for pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Accept Button
  const handleAccept = async (id) => {
    try {
      const requestToUpdate = propertyRequests.find(request => request.id === id);
      const updatedRequest = {
        ...requestToUpdate,
        is_accepted: true,
        is_rejected: false
      };

      await axios.put(`http://127.0.0.1:8000/requests/${id}/`, updatedRequest);

      // Update the state to reflect the changes
      setPropertyRequests(prevRequests => {
        return prevRequests.map(request => {
          if (request.id === id) {
            return updatedRequest;
          }
          return request;
        });
      });

      // Send email for acceptance
      const acceptanceServiceId = 'service_21hdjtz';
      const acceptanceTemplateId = 'template_io83mns';
      const acceptancePublicKey = 'xr6_cNCqHsf9TrFPu';
      const acceptanceData = {
        service_id: acceptanceServiceId,
        template_id: acceptanceTemplateId,
        user_id: acceptancePublicKey,
        template_params: {
          username: requestToUpdate.username,
          property_name: requestToUpdate.property_name,
          message: 'Your request has been accepted.',
          payment_link: '',
          reply_to: requestToUpdate.email,
        }
      };

      // Send the email using EmailJS
      await axios.post("https://api.emailjs.com/api/v1.0/email/send", acceptanceData);

      // Display alert when accept button is clicked
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 4000);

    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  // reject button to open the modal (open modal)
  const handleReject = (id) => {
    setSelectedRequestId(id);
    setShowRejectModal(true);
  };

  // reject button in modal (close modal)
  const handleCloseRejectModal = () => {
    setShowRejectModal(false);
    setSelectedRequestId(null);
    setRejectionReason("");
  };

  // handle rejection in the modal
  const handleSubmitRejectModal = async () => {
    try {
      const requestToUpdate = propertyRequests.find(request => request.id === selectedRequestId);
      const updatedRequest = {
        ...requestToUpdate,
        is_accepted: false,
        is_rejected: true,
        rejection_reason: rejectionReason
      };
      await axios.put(`http://127.0.0.1:8000/requests/${selectedRequestId}/`, updatedRequest);

      // Send email for rejection
      const rejectionServiceId = 'service_21hdjtz';
      const rejectionTemplateId = 'template_o7hhtco';
      const rejectionPublicKey = 'xr6_cNCqHsf9TrFPu';
      const rejectionData = {
        service_id: rejectionServiceId,
        template_id: rejectionTemplateId,
        user_id: rejectionPublicKey,
        template_params: {
          username: requestToUpdate.username,
          property_name: requestToUpdate.property_name,
          message: 'Your request has been rejected.',
          reply_to: requestToUpdate.email,
          rejection_reason: rejectionReason,
        }
      };

      // Send the email using EmailJS
      await axios.post("https://api.emailjs.com/api/v1.0/email/send", rejectionData);

      // to update the page to show changes
      setPropertyRequests(prevRequests => {
        return prevRequests.map(request => {
          if (request.id === selectedRequestId) {
            return updatedRequest;
          }
          return request;
        });
      });
      handleCloseRejectModal();
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <>Error: {error}</>;
  }

  return (
    <>
      {/* Acceptance alert */}
      <div style={{ position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)', zIndex: '1000', width: '50%', textAlign: 'center', fontWeight: '600' }}>
        {showAlert && (
          <div className="alert alert-success show" role="alert">
            We've notified the client about your accept via email
          </div>
        )}
      </div>

      {propertyRequests.length === 0 ? (
        <p>No requests available.</p>
      ) : (
        <>
          {/* Requests list */}
          {propertyRequests.map(request => (
            <Card className='mt-3' key={request.id} style={{ marginBottom: '10px' }}>
              <Card.Body>
                <Card.Title>{request.title}</Card.Title>
                <Card.Text>{formatDate(request.created_at)}</Card.Text>
                <Card.Text>{request.message}</Card.Text>

                {request.is_accepted ? (
                  <Badge bg="success">Accepted</Badge>
                ) : request.is_rejected ? (
                  <>
                    <Badge bg="danger">Rejected</Badge>
                    {request.rejection_reason && (
                      <span> - {request.rejection_reason}</span>
                    )}
                  </>
                ) : (
                  <Badge bg="secondary">Pending</Badge>
                )}

                {!request.is_accepted && !request.is_rejected && (
                  <div className='my-2'>
                    <Button variant="success" onClick={() => handleAccept(request.id)}>Accept</Button>{' '}
                    <Button variant="danger" className='mx-2' onClick={() => handleReject(request.id)}>Reject</Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          ))}

          {/* Pagination */}
          {propertyRequests.length > 0 && (
            <div className='d-flex justify-content-center mt-3'>
              <Button variant="outline-primary mx-2" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                Previous
              </Button>{' '}
              <Button variant="outline-primary mx-2" onClick={() => handlePageChange(page + 1)} disabled={page === 3}>
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* reject modal */}
      <Modal show={showRejectModal} onHide={handleCloseRejectModal}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="rejectionReason">
            <Form.Label>Reason for Rejection</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRejectModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSubmitRejectModal}>
            Reject
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Requests;
