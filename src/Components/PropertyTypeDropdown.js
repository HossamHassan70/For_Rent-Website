import React from 'react';
import { Dropdown } from 'react-bootstrap';

const PropertyTypeDropdown = () => {
  return (
    <Dropdown.Menu style={{ backgroundColor: 'white', maxHeight: '200px', overflowY: 'auto' }}>
      <Dropdown.Item eventKey="Apartment">Apartment</Dropdown.Item>
      <Dropdown.Item eventKey="Villa">Villa</Dropdown.Item>
      <Dropdown.Item eventKey="Townhouse">Townhouse</Dropdown.Item>
      <Dropdown.Item eventKey="Penthouse">Penthouse</Dropdown.Item>
      <Dropdown.Item eventKey="Compound">Compound</Dropdown.Item>
      <Dropdown.Item eventKey="Chalet">Chalet</Dropdown.Item>
      <Dropdown.Item eventKey="Twin House">Twin House</Dropdown.Item>
      <Dropdown.Item eventKey="Duplex">Duplex</Dropdown.Item>
      <Dropdown.Item eventKey="Full Floor">Full Floor</Dropdown.Item>
      <Dropdown.Item eventKey="Half Floor">Half Floor</Dropdown.Item>
      <Dropdown.Item eventKey="Whole Building">Whole Building</Dropdown.Item>
      <Dropdown.Item eventKey="Land">Land</Dropdown.Item>
      <Dropdown.Item eventKey="iVilla">iVilla</Dropdown.Item>
      <Dropdown.Item eventKey="Bulk Sale Unit">Bulk Sale Unit</Dropdown.Item>
      <Dropdown.Item eventKey="Bungalow">Bungalow</Dropdown.Item>
      <Dropdown.Item eventKey="Hotel Apartment">Hotel Apartment</Dropdown.Item>
      <Dropdown.Item eventKey="Cabin">Cabin</Dropdown.Item>
      <Dropdown.Item eventKey="Palace">Palace</Dropdown.Item>
      <Dropdown.Item eventKey="Roof">Roof</Dropdown.Item>
    </Dropdown.Menu>
  );
};

export default PropertyTypeDropdown;
