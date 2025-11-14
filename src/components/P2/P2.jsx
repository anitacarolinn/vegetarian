import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./P2.css";
import textData from "../../lang.json";

import dish from "../../assets/p2/dish.png";
import meat from "../../assets/p2/meat.svg";
import leg from "../../assets/p2/leg.svg";
import leaves from "../../assets/p2/leave.svg";
import bowl from "../../assets/p2/bowl.svg";
import Copyright from "../Copyright/Copyright";

export default function P2({ lang }) {
  const data = textData.vegetarian[lang];
  const path = lang === "zh" ? "" : `/${lang}`;

  const location = useLocation();

  useEffect(() => {
    // If there's a hash in the URL (e.g. #p2), scroll to that element after mount/navigation
    if (location && location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        // use a small timeout to ensure element is rendered
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
      }
    }
  }, [location]);

  const [rotations, setRotations] = useState({
    meat: 0,
    leg: 0,
    leaves: 0,
  });

  const rotate = (key) => {
    setRotations((prev) => ({ ...prev, [key]: prev[key] + 360 }));
  };

  return (
    /* Full-bleed wrapper that ignores centered parent so the two children sum to 100vw */
    <div className="p2-fullwidth" id="p2">
      {/* Left/main column (85%) */}
      <div className="p2-main">
        <h2 className="p2-title">{data["p2-title"]}</h2>

        <div className="p2-dishes">
          {/* Meat */}
          <Link to={`${path}/meat`}>
            <div className="p2-dish-item" onMouseEnter={() => rotate("meat")}>
              <img src={dish} className="dish" alt="Dish Plate" />
              <img
                src={meat}
                className="topping"
                alt="Meat"
                style={{
                  transform: `translate(-50%, -50%) rotate(${rotations.meat}deg)`,
                }}
              />
            </div>
          </Link>

          {/* Chicken Leg */}
          <Link to={`${path}/leg`}>
            <div className="p2-dish-item" onMouseEnter={() => rotate("leg")}>
              <img src={dish} className="dish" alt="Dish Plate" />
              <img
                src={leg}
                className="topping"
                alt="Chicken Leg"
                style={{
                  transform: `translate(-50%, -50%) rotate(${rotations.leg}deg)`,
                }}
              />
            </div>
          </Link>

          {/* Leaves + Bowl */}
          {/* <Link to={`${path}/form-survey`}>
          <div
            className="p2-dish-item"
            onMouseEnter={() => rotate("leaves")}
          >
            <img src={dish} className="dish" alt="Dish Plate" />

            <div
              className="plant-group"
              style={{
                transform: `translate(-50%, -50%) rotate(${rotations.leaves}deg)`,
              }}
            >
              <img src={leaves} className="leaves" alt="Leaves" />
              <img src={bowl} className="bowl" alt="Bowl" />
            </div>
          </div>
          </Link> */}
        </div>
      </div>

      {/* Right/side column (15%) - copyright */}
      <div className="p2-side">
        <Copyright lang={lang} />
      </div>
    </div>
  );
}
