import React from 'react';
import { Link } from 'react-router-dom';

const CategoryList = ({ title, items }) => (
  <div>
    <h6>{title}</h6>
    <div className="category-list">
      {items.map((item, index) => (
        <div key={index} className="category-item">
          <Link to="#" className="category-link">
            {item}
          </Link>
        </div>
      ))}
    </div>
  </div>
);

export default CategoryList;
