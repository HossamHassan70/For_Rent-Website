import React from 'react';

const Categories = () => (
  <div className="container mt-5">
     <style>
      {`
        .category-link {
          text-decoration: none;
          color: #3b97ba;
          transition: border-bottom 0.3s ease;
        }

        .category-link:hover {
          border-bottom: 1px solid #3b97ba;
        }
      `}
    </style>
    <div className="row">
      <div className="col-md-3 text-start">
        <h6>POPULAR SEARCHES</h6>
        <ul className="list-unstyled">
          <li>
            <a href="#" className="category-link">
              Apartments for rent in Egypt
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Apartment for sale in Egypt
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Houses for rent in Egypt
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Houses for sale in Egypt
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Land for sale in Egypt
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Property for sale in Egypt
            </a>
          </li>
        </ul>
      </div>
      <div className="col-md-3 text-start">
        <h6>POPULAR AREAS</h6>
        <ul className="list-unstyled">
          <li>
            <a href="#" className="category-link">
              Apartments for rent in Cairo
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Apartments for sale in Cairo
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Apartments for sale in New Cairo
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Apartments for rent in New Cairo
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Villas for rent in Gouna
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Apartment for rent Zamalek
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Katameya Heights Villas
            </a>
          </li>
        </ul>
      </div>
      <div className="col-md-3 text-start">
        <h6>TRENDING AREAS</h6>
        <ul className="list-unstyled">
          <li>
            <a href="#" className="category-link">
              Villa for rent in New Cairo
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
            Villa for sale in New Cairo
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Apartments for rent in Maadi
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
            Apartments for sale in Maadi
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
             Apartments for rent in Alexandria 
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
            Apartments for sale in Alexandria 
            </a>
          </li>
        </ul>
      </div>
      <div className="col-md-3 text-start">
        <h6>TRENDING SEARCHES</h6>
        <ul className="list-unstyled">
          <li>
            <a href="#" className="category-link">
              Studios for rent in Cairo
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Al Rehab city Apartments for sale
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Madinaty Villa for sale
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Apartments for sale in Hurghada
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Rent in Marassi North Coast
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Rent in North Coast Egypt
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Commercial properites for sale
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Categories;
