import React, { useState, useEffect } from "react";
import "./P1.css";
import textData from "../../lang.json";
import knife from "../../assets/p1/knife.svg";
import spoon from "../../assets/p1/spoon.svg";
import fork from "../../assets/p1/fork.svg";
import cattle from "../../assets/p1/cattle.svg";
import itTw from "../../assets/it-tw.svg";
import itEn from "../../assets/p1/p1-it-en.svg";
import itEs from "../../assets/p1/p1-it-es.svg";

export default function P1({ lang }) {
  const storedValue = 0;
  const initialLostLives = storedValue !== null ? Number(storedValue) : 0;

  const [lostLives, setLostLives] = useState(initialLostLives);
  const [time, setTime] = useState(new Date());

  const data = textData.vegetarian[lang];

  // Counter
  useEffect(() => {
    const interval = setInterval(() => {
      setLostLives((prevLostLives) => {
        const newValue = prevLostLives + 2443;
        localStorage.setItem("lostLives", newValue);
        return newValue;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const imageSrc = {
    zh: itTw,
    en: itEn,
    es: itEs,
  };

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondAngle = seconds * 6 + 90;
  const minuteAngle = minutes * 6 + seconds * 0.1 + 90;
  const hourAngle = (hours % 12) * 30 + minutes * 0.5 + 90;

  return (
    <div className={`p1-container lang-${lang}`}>
      <h2 className={`p1-title lang-${lang}`}>
        {lang === "zh" ? (
          <>
            {data["p1-title"][0]}
            <span className="p1-subtitle">
              <img src={imageSrc[lang]} alt="牠" />
            </span>
            {data["p1-title"][1]}
          </>
        ) : lang === "en" ? (
          <>
            <div>{data["p1-title"][0]}</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span className="p1-subtitle-lang">
                <img src={imageSrc[lang]} alt="牠" />
              </span>
              <div>{data["p1-title"][1]}</div>
            </div>
          </>
        ) : lang === "es" ? (
          <>
            <div>{data["p1-title"][0]}</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>{data["p1-title"][1]}</div>
              <span className="p1-subtitle-lang">
                <img src={imageSrc[lang]} alt="牠" />
              </span>
              <div>{data["p1-title"][2]}</div>
            </div>
          </>
        ) : null}
      </h2>

      <div className="p1-content">
        <div className="p1-left">
          <div className="p1-clock">
            <div className="clock-border"></div>
            <div className="clock-border-inner"></div>
            <img src={cattle} alt="cattle" className="clock-center" />
            <img
              src={fork}
              alt="hour hand"
              className="clock-hand hour-hand"
              style={{ transform: `translateY(-50%) rotate(${hourAngle}deg)` }}
            />
            <img
              src={spoon}
              alt="minute hand"
              className="clock-hand minute-hand"
              style={{
                transform: `translateY(-50%) rotate(${minuteAngle}deg)`,
              }}
            />
            <img
              src={knife}
              alt="second hand"
              className="clock-hand second-hand"
              style={{
                transform: `translateY(-50%) rotate(${secondAngle}deg)`,
              }}
            />
          </div>
        </div>

        <div className="p1-right">
          <p>{data["p1-content"][0]}</p>
          <p className="p1-lost-lives">
            <span className="p1-lost-lives-number">
              {lostLives.toLocaleString()}
            </span>{" "}
            <span className="p1-lost-lives-text">{data["p1-content"][1]}</span>
          </p>
          <p>{data["p1-content"][2]}</p>
          <p>{data["p1-content"][3]}</p>
          {lang === "zh" && <p>{data["p1-content"][4]}</p>}
          {lang === "zh" ? (
            <>
              <p>{data["p1-content"][5]}</p>
              <p>{data["p1-content"][6]}</p>
              <p>{data["p1-content"][7]}</p>
              <p>{data["p1-content"][8]}</p>
            </>
          ) : (
            <>
              <p>{data["p1-content"][4]}</p>
              <p>{data["p1-content"][5]}</p>
              <p>{data["p1-content"][6]}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
