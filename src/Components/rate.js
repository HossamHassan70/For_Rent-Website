import React, { useState, useEffect } from "react";
import axios from "axios";
import Rating from "react-rating";

const SVGIcon = (props) => (
  <svg className={props.className} pointerEvents="none">
    <use xlinkHref={props.href} />
  </svg>
);

const ReactStarsS = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api-generator.retool.com/mO7BTB/data"
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchData();
  }, []);

  const calculateAverageRating = () => {
    const totalRating = reviews.reduce((acc, curr) => acc + curr.Rate, 0);
    return totalRating / reviews.length;
  };

  return (
    <Rating
      initialRating={calculateAverageRating()}
      emptySymbol={<SVGIcon href="#icon-star-empty" className="icon" />}
      fullSymbol={<SVGIcon href="#icon-star-full" className="icon" />}
    />
  );
};

export default ReactStarsS;
