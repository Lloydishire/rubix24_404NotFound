import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { get, ref } from 'firebase/database';

const TourDetail = () => {
  const { id } = useParams();
  const [tourDetails, setTourDetails] = useState(null);

  useEffect(() => {
    const fetchTourDetails = async () => {
      const tourRef = ref(db, `site/${id}`);

      try {
        const snapshot = await get(tourRef);

        if (snapshot.exists()) {
          const tourData = snapshot.val();
          setTourDetails(tourData);
        } else {
          console.log('Tour not found.');
        }
      } catch (error) {
        console.error('Error fetching tour details:', error);
      }
    };

    fetchTourDetails();
  }, [id]);

  return (
    <div className='tour-detail'>
      {tourDetails ? (
        <>
          <h2>{tourDetails.name}</h2>
          <img src={tourDetails.img} alt={tourDetails.name} />
          <p>Duration: {tourDetails.duration}</p>
          <p>Price: {tourDetails.price}</p>
          <p>Reviews: {tourDetails.review}</p>
          <p>Facilities: {tourDetails.facilities}</p>
          <p>City: {tourDetails.city}</p>
        </>
      ) : (
        <p>Loading tour details...</p>
      )}
    </div>
  );
};

export default TourDetail;
