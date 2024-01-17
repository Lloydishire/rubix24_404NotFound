import React from 'react';
import './TourCardStyles.css';

const TourCard = ({
  title,
  imageSrc,
  duration,
  price,
  reviews,
  facility,
  city,
}) => {
  return (
    <div className="TourCard">
      <div className="cardBackground" />
      <img className="tourImage" src={imageSrc} alt="Tour" />
      <div className="tourTitle">Title: {title}</div>
      <div className="durationGroup">
        <div className="durationText">Duration: {duration}</div>
        <div className="durationIcon" />
      </div>
      <div className="priceGroup">
        <div className="Group231">
          <div className="priceText">{price}</div>
          <div className="PerPerson">per person</div>
        </div>
        <div className="Group230">
          <div className="Group229" />
          <div className="Reviews">{reviews} reviews</div>
        </div>
      </div>
      <div className="Group201">
        <div className="facility">Facility: {facility}</div>
        <div className="Vector" />
      </div>
      <div className="Group200">
        <div className="city">City: {city}</div>
        <div className="Vector" />
      </div>
      <div className="divider" />
    </div>
  );
};

export default TourCard;
