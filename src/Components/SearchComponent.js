import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchAction } from "../MyStore/actions/searchAction";
import {
  Dropdown,
  Button,
  FormControl,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";
import PropertyTypeDropdown from "./PropertyTypeDropdown";
import BedroomButton from "./BedroomButton";
import BathroomButton from "./BathroomButton";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [selectedBedroom, setSelectedBedroom] = useState(null);
  const [selectedBathroom, setSelectedBathroom] = useState(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);
  const searchError = useSelector((state) => state.search.error);
  const loading = useSelector((state) => state.search.loading);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch(
      searchAction({
        query,
        selectedBedroom,
        selectedBathroom,
        selectedPropertyType,
      })
    );
    navigate("/search-results");
  };


  const handleBedroomSelect = (value) => {
    setSelectedBedroom(value);
  };

  const handleBathroomSelect = (value) => {
    setSelectedBathroom(value);
  };

  const handlePropertyTypeSelect = (type) => {
    setSelectedPropertyType(type);
  };
  return (
    <div className="container text-center mb-6" style={{ marginTop: "200px" }}>
      <div
        className="rounded p-2 mx-auto"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          maxWidth: "700px",
          width: "100%",
        }}
      >
        <Row className="mb-2">
          <Col md={12} className="d-flex justify-content-center">
            <div className="search-bar" style={{ width: "100%" }}>
              <InputGroup className="rounded-pill">
                <FormControl
                  type="text"
                  placeholder="Enter Titel, Description or Address"
                  className="form-control search-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Dropdown className="select-container">
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    Property Type
                  </Dropdown.Toggle>
                  <PropertyTypeDropdown
                    onSelect={handlePropertyTypeSelect}
                    selectedValue={selectedPropertyType}
                  />
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="bedsBathsDropdown">
                    Beds & Baths
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Header>Bedrooms</Dropdown.Header>
                    <BedroomButton
                      value="Studio"
                      selectedValue={selectedBedroom}
                      onSelect={handleBedroomSelect}
                    />
                    <BedroomButton
                      value="1"
                      selectedValue={selectedBedroom}
                      onSelect={handleBedroomSelect}
                    />
                    <BedroomButton
                      value="2"
                      selectedValue={selectedBedroom}
                      onSelect={handleBedroomSelect}
                    />
                    <BedroomButton
                      value="3"
                      selectedValue={selectedBedroom}
                      onSelect={handleBedroomSelect}
                    />
                    <BedroomButton
                      value="4"
                      selectedValue={selectedBedroom}
                      onSelect={handleBedroomSelect}
                    />
                    <BedroomButton
                      value="5"
                      selectedValue={selectedBedroom}
                      onSelect={handleBedroomSelect}
                    />
                    <BedroomButton
                      value="6"
                      selectedValue={selectedBedroom}
                      onSelect={handleBedroomSelect}
                    />
                    <BedroomButton
                      value="7"
                      selectedValue={selectedBedroom}
                      onSelect={handleBedroomSelect}
                    />
                    <BedroomButton
                      value="7+"
                      selectedValue={selectedBedroom}
                      onSelect={handleBedroomSelect}
                    />
                    <Dropdown.Divider />
                    <Dropdown.Header>Bathrooms</Dropdown.Header>
                    <BathroomButton
                      value="1"
                      selectedValue={selectedBathroom}
                      onSelect={handleBathroomSelect}
                    />
                    <BathroomButton
                      value="2"
                      selectedValue={selectedBathroom}
                      onSelect={handleBathroomSelect}
                    />
                    <BathroomButton
                      value="3"
                      selectedValue={selectedBathroom}
                      onSelect={handleBathroomSelect}
                    />
                    <BathroomButton
                      value="4"
                      selectedValue={selectedBathroom}
                      onSelect={handleBathroomSelect}
                    />
                    <BathroomButton
                      value="5"
                      selectedValue={selectedBathroom}
                      onSelect={handleBathroomSelect}
                    />
                    <BathroomButton
                      value="+5"
                      selectedValue={selectedBathroom}
                      onSelect={handleBathroomSelect}
                    />
                  </Dropdown.Menu>
                </Dropdown>
                <Button
                  className="btn-search"
                  style={{
                    backgroundColor: "#008f97",
                    border: "none",
                    width: "100px",
                  }}
                  onClick={handleSearch}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Search"}
                </Button>
              </InputGroup>
            </div>
          </Col>
        </Row>
        {searchError && (
          <Row>
            <Col>
              <div className="text-danger">{searchError}</div>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default Search;
