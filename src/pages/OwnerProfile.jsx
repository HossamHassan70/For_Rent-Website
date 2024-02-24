import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';


const OwnerProfile = () => {
  const [postId, setPostId] = useState(1); // Default postId is 1
  const [propertyRequests, setPropertyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPropertyRequests = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/comments`, {
          params: {
            postId: postId,
            _page: page,
            _limit: 10 // Number of comments per page
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
            <Card.Title>{request.name}</Card.Title>
            <Card.Text>{request.body}</Card.Text>
            {/* Display other relevant request details */}
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

export default OwnerProfile;