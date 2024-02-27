import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Badge } from 'react-bootstrap';
import LoadingScreen from '../pages/loadingScreen';

const OwnerRequests = () => {
  const [propertyRequests, setPropertyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPropertyRequests = async () => {
      try {
        const response = await axios.get(`https://api-generator.retool.com/AeD3cJ/request`, {
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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleAccept = (id) => {
    // implementation
  };

  const handleReject = (id) => {
    // implement it
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
              <Badge bg="danger">Rejected</Badge>
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
    </>
  );
};

export default OwnerRequests;
