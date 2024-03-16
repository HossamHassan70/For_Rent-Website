import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const RatingMeter = ({ value, onChange }) => {
    const [hoverValue, setHoverValue] = useState(value);

    const handleMouseOver = (newValue) => {
        setHoverValue(newValue);
    };

    const handleMouseLeave = () => {
        setHoverValue(value);
    };

    const handleClick = (newValue) => {
        onChange(newValue);
    };

    return (
        <div>
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <FontAwesomeIcon
                        key={index}
                        icon={faStar}
                        className={ratingValue <= (hoverValue || value) ? 'text-warning' : 'text-secondary'}
                        onMouseOver={() => handleMouseOver(ratingValue)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(ratingValue)}
                        style={{ cursor: 'pointer', fontSize: '20px', marginRight: '4px' }}
                    />
                );
            })}
        </div>
    );
};

export default RatingMeter;
