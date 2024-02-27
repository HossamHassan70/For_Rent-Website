import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';


const OwnerRequests = () => {
  const [propertyRequests, setPropertyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPropertyRequests = async () => {
      try {
        const response = await axios.get(`https://retoolapi.dev/4yQUkm/request`, {
          params: {
            postId: postId,
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
  }, [postId, page]);

  const handlePostIdChange = (event) => {
    setPostId(event.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Property Requests</h2>
      <Form.Group>
        <Form.Label>Post ID:</Form.Label>
        <Form.Control type="number" value={postId} onChange={handlePostIdChange} />
      </Form.Group>
      {propertyRequests && propertyRequests.map(request => (
        <Card key={request.id}>
          <Card.Body>
            <Card.Title>{request.timestamp}</Card.Title>
            <Card.Text>{request.body}</Card.Text>
          </Card.Body>
        </Card>
      ))}
      <div>
        <Button variant="info" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous Page
        </Button>
        <Button variant="info" onClick={() => handlePageChange(page + 1)}>
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default OwnerRequests;