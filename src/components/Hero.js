import React from 'react';
import './HeroStyles.css';

const Hero = ({ title, description, buttonLabel1, buttonColor1 }) => {
  return (
    <div>
      <div className='hero'></div>
      <div className='title'>
        <h2>{title}</h2>
        <p>{description}</p>
        <button className={buttonColor1}>{buttonLabel1}</button>
      </div>
      <div className='translucent'>

        <div className="Frame23">
          <div className="Hotels">Hotels</div>
          <div className="Frame22">
            <div className="ViewTheRightHotelsForYou">View the right hotels for you</div>
            <div className="IconmonstrLocation11">
            </div>
          </div>
        </div>

        <div className="Frame23">
          <div className="Hotels">Restaurants</div>
          <div className="Frame22">
            <div className="ViewTheRightHotelsForYou">View the right cuisine for you</div>
            <div className="IconmonstrLocation11">
            </div>
          </div>
        </div>

        <div className="Frame23">
          <div className="Hotels">Transportation</div>
          <div className="Frame22">
            <div className="ViewTheRightHotelsForYou">Navigate your way safely easily</div>
            <div className="IconmonstrLocation11">
            </div>
          </div>
        </div>

        <div className="Frame23">
          <div className="Hotels">Navigator</div>
          <div className="Frame22">
            <div className="ViewTheRightHotelsForYou">Find Your Destination Here</div>
            <div className="IconmonstrLocation11">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
