import React from "react";
import { Dropdown } from "react-bootstrap";

const PropertyTypeDropdown = ({ selectedValue, onSelect }) => {
  const handleSelect = (type) => {
    onSelect(type);
  };

  return (
    <Dropdown.Menu
      style={{
        backgroundColor: "white",
        maxHeight: "200px",
        overflowY: "auto",
      }}
    >
      <Dropdown.Item
        active={selectedValue === "Apartment"}
        onClick={() => handleSelect("apartment")}
      >
        Apartment
      </Dropdown.Item>
      <Dropdown.Item
        active={selectedValue === "House"}
        onClick={() => handleSelect("house")}
      >
        House
      </Dropdown.Item>
      <Dropdown.Item
        active={selectedValue === "Condo"}
        onClick={() => handleSelect("condo")}
      >
        Condo
      </Dropdown.Item>
      <Dropdown.Item
        active={selectedValue === "Villa"}
        onClick={() => handleSelect("villa")}
      >
        Villa
      </Dropdown.Item>
    </Dropdown.Menu>
  );
};

export default PropertyTypeDropdown;
