import React from "react";
import { Button } from "react-bootstrap";

const BathroomButton = ({ value, selectedValue, onSelect }) => {
  const handleClick = () => {
    onSelect(value);
  };

  return (
    <Button
      variant="light"
      className={`${selectedValue === value ? "active" : ""} mx-2 my-1 btn-sm `}
      style={{ border: "1px solid #dee2e6" }}
      onClick={handleClick}
    >
      {value}
    </Button>
  );
};
export default BathroomButton;
