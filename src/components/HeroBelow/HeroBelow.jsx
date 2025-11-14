import React from 'react';
import './HeroBelow.css';
import textData from '../../lang.json';
import arrow from '../../assets/hero/arrow.svg';

export default function HeroBelow({ lang }) {
  const data = textData.vegetarian[lang];

  return (
    <div className="hero-below-container">
      <p className={`hero-description lang-${lang}`}>
        {data['hero-content'][0]}
        <br />
        {data['hero-content'][1]}
        <br />
        {data['hero-content'][2]}
      </p>

      <button
        className="arrow-btn"
        onClick={() => {
          const p1Element = document.querySelector('.p1-container');
          if (p1Element) {
            p1Element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <img src={arrow} alt="scroll down" />
      </button>
    </div>
  );
}
