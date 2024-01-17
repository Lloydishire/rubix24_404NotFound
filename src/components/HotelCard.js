import React from 'react';
import './TourCardStyles.css';

const HotelCard = ({
  title,
  imageSrc,
  price,
  reviews,
  description,
}) => {
  return (
    <div className="TourCard">
      <div className="cardBackground" />
      <img className="tourImage" src={imageSrc} alt="Hotel" />
      <div className="tourTitle">{title}</div>
      <div className="priceGroup">
        <div className="Group231">
          <div className="priceText">{price}</div>
          <div className="PerPerson">per night</div>
        </div>
        <div className="Group230">
          <div className="Group229" />
          <div className="Reviews">{reviews} reviews</div>
        </div>
      </div>
      <div className="facilitiesGroup">
        <div className="Description">{description}</div>
      </div>
      <div className="divider" />
    </div>
  );
};

export default HotelCard;
