// RegisterPage.js

import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import firebaseConfig from './firebaseConfig'; // Import your Firebase configuration
import './js/CSS/RegisterPage.css'; // Import your CSS file

const RegisterPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Initialize Firebase when the component mounts
    initializeApp(firebaseConfig);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const db = getDatabase();
      const userStatusRef = ref(db, `MyUsers/${user.uid}/status`);
      await set(userStatusRef, 'online');

      // Pass the user ID to the onLoginSuccess callback
      onLoginSuccess(user.uid);

      // Redirect or perform actions for successful login
      console.log('User exists:', user);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        console.log('User does not exist.');
        // Handle accordingly - show message or take necessary actions
      } else {
        console.error('Error:', error);
        // Handle other errors - show error message or take necessary actions
      }
    }
  };

  return (
    <div className="register-container">
      <div className="card">
        <h1>Enter Your Details</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <p>Sign in options</p>
        <img
          className="google-button"
          src="https://th.bing.com/th/id/R.4b766c539887e9edd9d8aee55e5112ec?rik=bFrHKin4yAuERw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fgoogle-logo-png-revised-google-logo-1600.png&ehk=y7uXwoVOWiylv8SEPWjEhuUKB%2bUUu0jhp7LeYPd8Mr8%3d&risl=&pid=ImgRaw&r=0"
          alt="Sign in with Google"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
