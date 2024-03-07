import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchAction } from '../MyStore/actions/searchAction';
import { Dropdown, Button, FormControl, InputGroup, Row, Col, ButtonGroup } from 'react-bootstrap';
import PropertyTypeDropdown from './PropertyTypeDropdown';
import BedroomButton from './BedroomButton';
import BathroomButton from './BathroomButton';

const Search = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchAction(query));
  };

  return (
    <div className="container text-center mb-6" style={{ marginTop: '200px' }}>
      <div className="rounded p-2 mx-auto" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', maxWidth: '700px', width: '100%' }}>
        <Row className="mb-3">
          <Col md={12} className="d-flex justify-content-center">
            <Col md={6} className="d-flex justify-content-center">
              <ButtonGroup aria-label="Basic checkbox toggle button group" className="rounded overflow-hidden" style={{ width: '100%' }}>
                <Button variant="light" size="sm" className="option-button d-flex align-items-center justify-content-center" style={{ width: '50%' }}>
                  Buy
                </Button>
                <Button variant="light" size="sm" className="option-button d-flex align-items-center justify-content-center" style={{ width: '50%' }}>
                  Rent
                </Button>
              </ButtonGroup>
            </Col>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col md={12} className="d-flex justify-content-center">
            <div className="search-bar" style={{ width: '100%' }}>
              <InputGroup className='rounded-pill'>
                <FormControl
                  type="text"
                  placeholder="Enter City, state or Zip"
                  className="form-control search-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)} />
                <Dropdown className="select-container">
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    Property Type
                  </Dropdown.Toggle>
                  <PropertyTypeDropdown />
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="bedsBathsDropdown">
                    Beds & Baths
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Header>Bedrooms</Dropdown.Header>
                    <BedroomButton value="Studio" />
                    <BedroomButton value="1" />
                    <BedroomButton value="2" />
                    <BedroomButton value="3" />
                    <BedroomButton value="4" />
                    <BedroomButton value="5" />
                    <BedroomButton value="6" />
                    <BedroomButton value="7" />
                    <BedroomButton value="7+" />
                    <Dropdown.Divider />
                    <Dropdown.Header>Bathrooms</Dropdown.Header>
                    <BathroomButton value="1" />
                    <BathroomButton value="2" />
                    <BathroomButton value="3" />
                    <BathroomButton value="4" />
                    <BathroomButton value="5" />
                    <BathroomButton value="6" />
                    <BathroomButton value="7" />
                    <BathroomButton value="7+" />
                  </Dropdown.Menu>
                </Dropdown>
                <Button className="btn-search"
                style={{ backgroundColor: '#008f97', border: 'none', width: '100px' }}
                onClick={handleSearch}>Search</Button>
              </InputGroup>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Search;
