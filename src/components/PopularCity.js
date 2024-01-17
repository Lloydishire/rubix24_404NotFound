import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import './PopularCityStyles.css';
import TourCard from './TourCard';
import { db } from '../firebase'; 
import { get, ref } from 'firebase/database';

const PopularCity = () => {
  const [toursData, setToursData] = useState([]);
  const [activeButton, setActiveButton] = useState(null);
  const [selectedCityInfo, setSelectedCityInfo] = useState(null);

  const handleButtonClick = (buttonText) => {
    setActiveButton(buttonText);
  };

  useEffect(() => {
    const fetchToursData = async () => {
      const toursRef = ref(db, 'site');

      try {
        const snapshot = await get(toursRef);

        if (snapshot.exists()) {
          const toursData = snapshot.val();

          const filteredTours = Object.keys(toursData)
            .filter((key) => !isNaN(parseInt(key)))
            .map((tourId) => ({
              id: tourId,
              ...toursData[tourId],
            }))
            .filter((tour) => tour.city.toLowerCase() === activeButton?.toLowerCase());

          setToursData(filteredTours);
          const cityInfo = filteredTours.length > 0 ? filteredTours[0] : null;
          setSelectedCityInfo(cityInfo);
        } else {
          console.log('No tours found.');
        }
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };

    fetchToursData();
  }, [activeButton]);

  return (
    <div className='popularcity'>
      <h2>Explore Popular City Destination</h2>
      <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit</p>
      <div className="ButtonContainer">
        <div className="ButtonContainer">
        <div className={`Button ${activeButton === 'New York' ? 'ButtonGreen' : ''}`} onClick={() => handleButtonClick('New York')}>
          <div className="ButtonText">New York</div>
        </div>
        <div className={`Button ${activeButton === 'California' ? 'ButtonGreen' : ''}`} onClick={() => handleButtonClick('California')}>
          <div className="ButtonText">California</div>
        </div>
        <div className={`Button ${activeButton === 'Alaska' ? 'ButtonGreen' : ''}`} onClick={() => handleButtonClick('Alaska')}>
          <div className="ButtonText">Alaska</div>
        </div>
        <div className={`Button ${activeButton === 'Sidney' ? 'ButtonGreen' : ''}`} onClick={() => handleButtonClick('Sidney')}>
          <div className="ButtonText">Sidney</div>
        </div>
        <div className={`Button ${activeButton === 'Dubai' ? 'ButtonGreen' : ''}`} onClick={() => handleButtonClick('Dubai')}>
          <div className="ButtonText">Dubai</div>
        </div>
        <div className={`Button ${activeButton === 'London' ? 'ButtonGreen' : ''}`} onClick={() => handleButtonClick('London')}>
          <div className="ButtonText">London</div>
        </div>
        <div className={`Button ${activeButton === 'Tokyo' ? 'ButtonGreen' : ''}`} onClick={() => handleButtonClick('Tokyo')}>
          <div className="ButtonText">Tokyo</div>
        </div>
        <div className={`Button ${activeButton === 'Mumbai' ? 'ButtonGreen' : ''}`} onClick={() => handleButtonClick('Mumbai')}>
          <div className="ButtonText">Mumbai</div>
        </div>
        </div>
      </div>
      <img style={{ width: 1170, height: 500 }} src="https://via.placeholder.com/1170x500" />
      <div style={{ width: 1110, height: 275, background: '#F9FDFF', margin: '-8rem', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.12)', borderRadius: 3 }}>
        <div className='CityInfo'>
          {selectedCityInfo && (
            <>
              <h3>{selectedCityInfo.city}</h3>
              <h4>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</h4>
            </>
          )}
        </div>
      </div>
      <div className="GridComponent">
        {toursData.map((tour) => (
          <Link key={tour.id} to={`/tour/${tour.id}`}>
            <TourCard
              title={tour.name}
              imageSrc={tour.img}
              duration={tour.duration}
              price={tour.price}
              reviews={tour.review}
              facility={tour.facilities}
              city={tour.city}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularCity;
