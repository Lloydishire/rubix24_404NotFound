import React, { useState, useEffect } from 'react';
import { ref, get} from 'firebase/database';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';

const ViewRegistered = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      const user = getAuth().currentUser;
      if (user) {
        const hotelsRef = ref(db, 'hotel');
        const snapshot = await get(hotelsRef);

        if (snapshot.exists()) {
          const hotelList = [];
          snapshot.forEach((hotelSnapshot) => {
            const hotelData = hotelSnapshot.val();
            const uid = hotelData.uid;

            if (uid === user.uid) {
              // Only add the hotel if UID matches the current user
              hotelList.push({ id: hotelSnapshot.key, ...hotelData });
            }
          });

          setHotels(hotelList);
        } else {
          console.log('No registered hotels found.');
        }

        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (hotels.length === 0) {
    return <p className="no-hotels">No registered hotels found.</p>;
  }

return (
  <div className="hotel-list-container">
    <h2>Registered Hotels:</h2>
    <ul className="hotel-list">
    <hr/>
      {hotels.map((hotel, index) => (
        
        <React.Fragment key={hotel.id}>
          <li>
            <h5>Hotel Name: {hotel.name}</h5>
            <h5>Description: {hotel.description}</h5>
            <h5>Status: {hotel.verified === 0 ? 'Not verified' : 'Verified'}</h5>
          </li>
          <hr/>
        </React.Fragment>
      ))}
    </ul>
  </div>
);
      };

export default ViewRegistered;
