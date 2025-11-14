import React from "react";
import HeroSection from "../../components/HeroSection/HeroSection";
import P1 from "../../components/P1/P1";
import "./Home.css";
import P2 from "../../components/P2/P2";
import HeroBelow from "../../components/HeroBelow/HeroBelow";

export default function Home({ lang }) {
  return (
    <div className="home-container">
      <HeroSection lang={lang} />
      <HeroBelow lang={lang} />
      <P1 lang={lang} />
      <P2 lang={lang} />
    </div>
  );
}
