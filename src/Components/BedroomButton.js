import React from "react";
import { Button } from "react-bootstrap";

const BedroomButton = ({ value, onClick, selected }) => {
  return (
    <Button
      variant="light"
      className={`${selected === value ? 'active' : ''} mx-2 my-1 btn-sm `}
      style={{ border: "1px solid #dee2e6" }}
      onClick={() => onClick(value)}
    >
      {value}
    </Button>
  );
};

export default BedroomButton;
