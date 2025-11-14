import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import "./HeroSection.css";
import textData from "../../lang.json";
import { useNavigate } from "react-router-dom";
import "primereact/resources/themes/lara-light-cyan/theme.css"; // theme
import "primereact/resources/primereact.min.css"; // core css

import arrow from "../../assets/hero/arrow.svg";

// Import FontAwesome
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function HeroSection({ lang }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const titleRef = useRef(null);

  const data = textData.vegetarian[lang];

  const getLanguageButtons = () => {
    const languages = [
      { code: "zh", label: "中", path: "/" },
      { code: "en", label: "EN", path: "/en" },
      { code: "es", label: "ES", path: "/es" },
    ];

    // Filter bahasa yang tidak sedang aktif
    return languages.filter((item) => item.code !== lang);
  };

  const imageSrc = {
    zh: "src/assets/it-tw.svg",
    en: "src/assets/hero/it-en.svg",
    es: "src/assets/hero/it-es.svg",
  };

  const videoSrc = {
    zh: "src/assets/videos/buffalo.mp4",
    en: "src/assets/videos/seagulls.mp4",
    es: "src/assets/videos/buffalo.mp4",
  };

  const currentVideo = videoSrc[lang];

  const languageButtons = getLanguageButtons();

  const handleLanguageChange = (path) => {
    navigate(path);
  };

  useEffect(() => {
    if (titleRef.current) {
      const width = titleRef.current.offsetWidth;
      const divider = document.querySelector(".divider");
      if (divider) {
        divider.style.width = `${width * 0.8}px`;
      }
    }
  }, [lang, data]);

  return (
    <section className="hero-container" id="hero">
      {/* Media wrapper: video + overlay */}
      <div className="hero-media">
        {/* Background video */}
        <div className="hero-bg-video">
          <video autoPlay muted loop playsInline key={currentVideo}>
            <source src={currentVideo} type="video/mp4" />
          </video>
        </div>

        {/* Overlay that sits on top of the video frame (top-bar + title + play) */}
        <div className="hero-overlay">
          {/* Top Bar */}
          <div className="hero-top-bar" alt="logo">
            <a
              href="https://www.tzuchi.org.tw/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="src/assets/logo.png" className="hero-logo" />
            </a>

            <div className="hero-nav-buttons">
              <Button
                label={data["goveg-btn"]}
                className="p-button-rounded p-button-text white-btn"
                onClick={() => {
                  if (lang === 'zh') {
                    navigate('/form-survey');
                  } else {
                    navigate(`/${lang}/form-survey`);
                  }
                }}
              />
              <Button
                label={data["vownum-btn"]}
                className="p-button-rounded p-button-text white-btn"
                onClick={() => navigate(`/${lang}/currentstats`)}
              />
              {/* language buttons */}
              {languageButtons.map((lang) => (
                <Button
                  key={lang.code}
                  label={lang.label}
                  className="p-button-rounded p-button-text white-btn lang-btn"
                  onClick={() => handleLanguageChange(lang.path)}
                />
              ))}
            </div>
          </div>

          <div className="hero-overlay-content">
            <div className={`hero-title lang-${lang}`} ref={titleRef}>
              {lang === "zh" ? (
                // TW Layout: Semua sederet
                <>
                  {data["hero-title"][0]}

                  <span className="p1-subtitle">
                    <img src={imageSrc[lang]} alt="牠" />
                  </span>
                  {data["hero-title"][1]}
                </>
              ) : (
                // EN/ES Layout: [0] di atas, lalu gambar dan [1] di bawah, sejajar
                <>
                  <div className={`hero-title lang-${lang}`} ref={titleRef}>
                    <div>{data["hero-title"][0]}</div>
                    <div>{data["hero-title"][1]}</div>

                    <div className="hero-title-row">
                      <span className="p1-subtitle">
                        <img src={imageSrc[lang]} alt="牠" />
                      </span>
                      <span className="hero-title-text">
                        {data["hero-title"][2]}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="divider"></div>

            {/* Overlay content (visible on desktop; hidden on small screens) */}
            <div className="overlay-description">
              <p className={`hero-description lang-${lang}`}>
                {data["hero-content"][0]}
                <br />
                {data["hero-content"][1]}
                <br />
                {data["hero-content"][2]}
              </p>
            </div>

            {/* Play Button dengan FontAwesome */}
            <button
              className="play-btn fa-btn"
              onClick={() => setShowPopup(true)}
            >
              <i className="fa-regular fa-circle-play"></i>
            </button>

            {/* Overlay arrow (visible on desktop; hidden on small screens) */}
            <button
              className="arrow-btn overlay-arrow"
              onClick={() => {
                const p1Element = document.querySelector(".p1-container");
                if (p1Element) {
                  p1Element.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <img src={arrow} alt="scroll down" />
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="video-popup">
          <div
            className="video-popup-overlay"
            onClick={() => setShowPopup(false)}
          ></div>
          <div className="video-popup-content">
            <video src="src/assets/videos/videovet.mp4" autoPlay controls />
            <button className="close-btn" onClick={() => setShowPopup(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
