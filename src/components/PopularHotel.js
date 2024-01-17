import React, { useEffect, useState } from 'react';
import './PopularCityStyles.css';
import HotelCard from './HotelCard';
import { db } from '../firebase'; 
import { get, ref } from 'firebase/database';

const PopularHotel = () => {
  const [hotelsData, setHotelsData] = useState([]);

  useEffect(() => {
    const fetchHotelData = async () => {
      const hotelsRef = ref(db, 'hotel');
    
      try {
        const snapshot = await get(hotelsRef);
    
        if (snapshot.exists()) {
          const hotelData = snapshot.val();
    
          const hotelListings = Object.keys(hotelData)
            .filter((key) => !isNaN(parseInt(key))) 
            .map((hotelId) => ({
              id: hotelId,
              ...hotelData[hotelId],
            }));
    
          setHotelsData(hotelListings);
        } else {
          console.log('No hotels found.');
        }
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
    

    fetchHotelData();
  }, []);

  return (
    <div className='popularcity'>
      <h2>Explore Popular Hotels</h2>
      <p>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit</p>
      <div className='GridComponent' style={{ marginTop: '0' }}>
        {hotelsData.map((hotel) => (
          <HotelCard
            key={hotel.id}
            title={hotel.name}
            imageSrc={hotel.img}
            price={hotel.price}
            reviews={hotel.reviews}
            description={hotel.description}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularHotel;
