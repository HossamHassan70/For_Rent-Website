import React from 'react';
import { Dropdown } from 'react-bootstrap';

const PropertyTypeDropdown = () => {
  return (
    <Dropdown.Menu style={{ backgroundColor: 'white', maxHeight: '200px', overflowY: 'auto' }}>
      <Dropdown.Item eventKey="Apartment">Apartment</Dropdown.Item>
      <Dropdown.Item eventKey="Villa">Villa</Dropdown.Item>
      <Dropdown.Item eventKey="House">House</Dropdown.Item>
      <Dropdown.Item eventKey="Conda">Conda</Dropdown.Item>
    </Dropdown.Menu>
  );
};

export default PropertyTypeDropdown;
