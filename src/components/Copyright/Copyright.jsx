import React from "react";
import "./Copyright.css";
import textData from "../../lang.json";

export default function Copyright({ lang }) {
  const data = textData.vegetarian[lang];

  return (
    <div id="b-footer">
      <div className="footer-content">
        <div className="footer1">{data["copyright-text"][0]}</div>
        <div className="footer2">
          {data["copyright-text"][1].split("Tzu Chi Foundation.")[0]}
          <a
            href="https://go-vegetarian.tzuchi.org.tw/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tzu Chi Foundation.
          </a>
        </div>
      </div>
    </div>
  );
}
