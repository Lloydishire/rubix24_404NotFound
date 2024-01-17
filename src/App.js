import React from "react";
import Home from "../src/routes/Home.js"
import TourDetail from "../src/routes/TourDetail.js"
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/tour/:id" element={<TourDetail/>} />
      </Routes>
    </>
  );
}

export default App;
