/* eslint-disable no-unused-vars */
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useLocation } from 'react-router-dom';

const PropertyMapView = () => {
  const location = useLocation();
  const propertyLocation = location?.state?.propertyLocation || [51.5074, -0.1278]; // Default location: London, UK

  return (
    <MapContainer center={propertyLocation} zoom={14} style={{ height: '400px', width: "85%" }}>

    </MapContainer>
  );
};

export default PropertyMapView;
