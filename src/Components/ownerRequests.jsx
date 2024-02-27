import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Badge, Modal, Form } from 'react-bootstrap';
import LoadingScreen from '../pages/loadingScreen';

const OwnerRequests = () => {
  const [propertyRequests, setPropertyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  // modal states
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("")

  useEffect(() => {
    const fetchPropertyRequests = async () => {
      try {
        const response = await axios.get(`https://retoolapi.dev/KqGq4M/request`, {
          params: {
            _page: page,
            _limit: 10
          }
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
      await axios.put(`https://retoolapi.dev/KqGq4M/request/${id}`, updatedRequest);

      // to update the page to show changes
      setPropertyRequests(prevRequests => {
        return prevRequests.map(request => {
          if (request.id === id) {
            return updatedRequest;
          }
          return request;
        });
      });
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
        // to add rejection reason to api
        rejection_reason: rejectionReason
      };
      await axios.put(`https://retoolapi.dev/KqGq4M/request/${selectedRequestId}`, updatedRequest);

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

  // reset button change all requests status to pending
  const handleResetStatus = async () => {
    try {
      const updatedRequests = [];
      for (const request of propertyRequests) {
        const updatedRequest = {
          ...request,
          is_accepted: false,
          is_rejected: false
        };
        await axios.put(`https://retoolapi.dev/KqGq4M/request/${request.id}`, updatedRequest);
        updatedRequests.push(updatedRequest);
      }

      // to update the page to show changes
      setPropertyRequests(updatedRequests);
    } catch (error) {
      console.error('Error resetting status:', error);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <>Error: {error}</>;
  }

  return (
    <>
      {/* Requests list */}
      {propertyRequests.map(request => (
        <Card className='mt-3' key={request.id} style={{ marginBottom: '10px' }}>
          <Card.Body>
            <Card.Title>{request.title}</Card.Title>
            <Card.Text>{request.timestamp}</Card.Text>
            <Card.Text>{request.body}</Card.Text>

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
      <div className='d-flex justify-content-center mt-3'>
        <Button variant="outline-primary mx-2" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </Button>{' '}
        <Button variant="outline-primary mx-2" onClick={() => handlePageChange(page + 1)} disabled={page === 3}>
          Next
        </Button>
      </div>
      <Button variant="danger" onClick={handleResetStatus}>Reset All Status</Button>

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

export default OwnerRequests;
