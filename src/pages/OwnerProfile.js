import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OwnerProfile = () => {
  const [propertyRequests, setPropertyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPropertyRequests = async () => {
      try {
        const response = await axios.get('/api/property-requests'); // Replace with the actual API endpoint URL
        setPropertyRequests(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPropertyRequests();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Property Requests</h2>
      {propertyRequests && propertyRequests.map(request => (
        <div key={request.id}>
          <h3>{request.propertyName}</h3>
          <p>{request.message}</p>
          {/* Display other relevant request details */}
        </div>
      ))}
    </div>
  );
};

export default OwnerProfile;