import React, { useState } from 'react';
import { ref, get, set } from 'firebase/database';
import { db, imageDb } from '../firebase';
import { ref as sRef } from 'firebase/storage';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { getAuth } from 'firebase/auth';
import './VerificationFormStyles.css';

const VerificationForm = () => {
  const [formData, setFormData] = useState({
    aadharFront: null,
    aadharBack: null,
    hotelTitle: '',
    hotelDescription: '',
    hotelImage: '',
    hotelPrice: '',
    hotelVerified: 0,
    hotelX: '',
    hotelY: '',
    hotelCity: '',
    hotelFacilities: '',
  });

  const [img, setImg] = useState('');
  const [imgUrl, setImgUrl] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const user = getAuth().currentUser;
    if (!user) {
      alert('Not authorized. Please log in.');
      return;
    }
  
    try {
      const countRef = ref(db, 'hotel/count');
      const snapshot = await get(countRef);
      const currentCount = snapshot.val();
  
      const revData = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
      const formDataForFirebase = {
        description: formData.hotelDescription,
        img: formData.hotelImage,
        name: formData.hotelTitle,
        price: formData.hotelPrice,
        verified: formData.hotelVerified,
        x: formData.hotelX,
        y: formData.hotelY,
        city: formData.hotelCity,
        facilities: formData.hotelFacilities,
        rev: revData,
        count: currentCount,
        uid: user.uid,
      };
  
      const hotelRef = ref(db, `hotel/${currentCount}`);
      await set(hotelRef, formDataForFirebase);
  
      await set(countRef, currentCount + 1);
  
      alert('Hotel data added successfully!');
    } catch (error) {
      console.error('Error adding hotel data:', error);
      alert('An error occurred. Please try again.');
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClick = () => {
    if (img !== null) {
      const imgRef = sRef(imageDb, `files/${v4()}`);
      uploadBytes(imgRef, img).then((value) => {
        console.log(value);
        getDownloadURL(value.ref).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
      });
    }
  };

  return (
    <div className="content">
      <h1>Verification Portal</h1>

      <div className="verification-form">
        <form onSubmit={handleSubmit}>
        <label htmlFor="hotel-title">Name of the Hotel</label>
          <br />
          <input
            type="text"
            name="hotelTitle"
            value={formData.hotelTitle}
            onChange={handleChange}
          />
          <br />
          <br />
          <br />

          <label htmlFor="hotel-description">Hotel Description</label>
          <br />
          <input
            type="text"
            name="hotelDescription"
            value={formData.hotelDescription}
            onChange={handleChange}
          />
          <br />
          <br />
          <br />

          <label htmlFor="hotel-image">Hotel Image URL</label>
          <br />
          <input
            type="text"
            name="hotelImage"
            value={formData.hotelImage}
            onChange={handleChange}
          />
          <br />
          <br />
          <br />

          <label htmlFor="hotel-price">Hotel Price</label>
          <br />
          <input
            type="text"
            name="hotelPrice"
            value={formData.hotelPrice}
            onChange={handleChange}
          />
          <br />
          <br />
          <br />

          <label htmlFor="hotel-x">Hotel X</label>
          <br />
          <input
            type="text"
            name="hotelX"
            value={formData.hotelX}
            onChange={handleChange}
          />
          <br />
          <br />
          <br />

          <label htmlFor="hotel-y">Hotel Y</label>
          <br />
          <input
            type="text"
            name="hotelY"
            value={formData.hotelY}
            onChange={handleChange}
          />
          <br />
          <br />
          <br />

          <label htmlFor="hotel-city">Hotel City</label>
          <br />
          <input
            type="text"
            name="hotelCity"
            value={formData.hotelCity}
            onChange={handleChange}
          />
          <br />
          <br />
          <br />

          <label htmlFor="hotel-facilities">Hotel Facilities</label>
          <br />
          <input
            type="text"
            name="hotelFacilities"
            value={formData.hotelFacilities}
            onChange={handleChange}
          />
          <br />
          <br />
          <br />
            <h3>Aadhar Card</h3>
          <input type="file" onChange={(e) => setImg(e.target.files[0])} />
          <button onClick={handleClick}>Upload</button>
          <br />
          {imgUrl.map((dataVal) => (
            <div key={dataVal}>
              <img src={dataVal} height="200px" width="200px" />
              <br />
            </div>
          ))}

        </form>
      </div>
    </div>
  );
};

export default VerificationForm;
