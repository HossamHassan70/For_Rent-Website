import React from 'react';
import { Button } from 'react-bootstrap';

const BathroomButton = ({ value }) => {
  return (
    <Button variant="light" href="#" className="mx-2 my-1 btn-sm" style={{ border: '1px solid #dee2e6' }}>
      {value}
    </Button>
  );
};

export default BathroomButton;
