import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./view property.css";
import { useParams } from "react-router-dom";
import Rev from "../Components/reviews";

function PropertyView() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        if (response.status === 200) {
          setProperty(response.data);
        } else {
          setError("Failed to fetch property data");
        }
      } catch (error) {
        setError("Failed to fetch property data");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div className="property-container">
      <h2 className="property-title">{property.title}</h2>
      <p className="property-info">Location: {property.location}</p>
      <p className="property-info">Price: {property.price}</p>
      <Rev />
    </div>
  );
}

export default PropertyView;

