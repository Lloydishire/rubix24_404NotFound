import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero.js";
import PopularCity from "../components/PopularCity.js";
import PopularHotel from "../components/PopularHotel.js";
import BannerImage from '../assets/banner.svg';
import Footer from '../assets/footer.svg';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero
        title="Name of Website"
        description="Lorem ipsum dolor sit amet consectetur. Dui vitae purus arcu diam quis facilisis facilisis lobortis scelerisque. Platea semper a eros amet donec mi vehicula. Dis nunc aliquet quam varius quam. Orci etiam fermentum nibh sed quis sit."
        buttonLabel1="Discover Now"
        buttonColor1="greenbtn"
      />
      <div style={{backgroundColor:'#DAED82',width:'1440px',height:'410px',marginTop:'3rem'}}/>
      <PopularCity />
      <img src={BannerImage} style={{ width: '100%', height: 'auto' }} alt="Banner" />
      <PopularHotel/>
      <img src={Footer} style={{ width: '100%', height: 'auto' }} alt="Banner" />
    </div>
  );
}

export default Home;
