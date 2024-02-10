import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '../MyStore/actions/fetchProperties';
import { ListGroup } from 'react-bootstrap';

const PropertiesList = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.properties.error);
  const loading = useSelector((state) => state.properties.loading);
  const properties = useSelector((state) => state.properties.properties.products);
//   console.log(properties)
  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!properties) {
    return <div>No properties found.</div>;
  }

  return (
    <div>
      <h2>Properties List</h2>
      <ListGroup>
        {properties.map(product => (
          <ListGroup.Item key={product.id}>
            <div>
              <img src={product.thumbnail} alt={product.title} style={{ width: '100px', marginRight: '10px' }} />
              <div>
                <h4>{product.title}</h4>
                <p>Brand: {product.brand}</p>
                <p>Description: {product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Rating: {product.rating}</p>
                <p>Stock: {product.stock}</p>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default PropertiesList;
