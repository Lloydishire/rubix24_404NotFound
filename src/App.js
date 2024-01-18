import React from "react";
import Home from "../src/routes/Home.js"
import TourDetail from "../src/routes/TourDetail.js"
import SignInSide from "../src/routes/SignIn.js"
import VerificationForm from "../src/routes/VerificationForm.js"
import MyProfile from "../src/routes/MyProfile.js"
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<SignInSide/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/tour/:id" element={<TourDetail/>} />
        <Route path="/verify" element={<VerificationForm/>}/>
        <Route path="/profile" element={<MyProfile/>}/>
      </Routes>
    </>
  );
}

export default App;
