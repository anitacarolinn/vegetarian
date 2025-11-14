import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import textData from "../../lang.json";
import "./leg.css";
import Copyright from "../../components/Copyright/Copyright";
import sickPeople from "../../assets/sick.svg";
import sickHot from "../../assets/sick2.svg";
import virus from "../../assets/virus.svg";
import logo from '../../assets/logo.png';

const Leg = ({ lang }) => {
  const data = textData.vegetarian[lang];
  const path = lang === "zh" ? "" : `${lang}`;

  return (
    <div className="leg-fullwidth">
      <div className="leg-top-bar">
        <a
          href="https://www.tzuchi.org.tw/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} alt="Logo" className="leg-logo" />
        </a>

        <div className="leg-nav-buttons">
          <Link to={`/${path}#p2`}>
            <Button
              label={data["backp2-btn"]}
              className="p-button-rounded p-button-text white-btn"
            />
          </Link>
          <Link to={`/${path}#hero`}>
            <Button
              label={data["backhome-btn"]}
              className="p-button-rounded p-button-text white-btn"
            />
          </Link>
        </div>
      </div>

      {/* ✅ Dua kolom */}
      <div className="leg-layout">
        <div className="leg-left">
          <div className="sick-container">
            <img className="sick-people" src={sickPeople} alt="Sick Person" />
            <img className="sick-hot" src={sickHot} alt="Hot" />
            <img className="sick-virus" src={virus} alt="Virus" />
          </div>
        </div>

        {/* ✅ scroll hanya bagian ini */}
        <div className="leg-right">
          <h1 className="leg-title">{data["leg-title"]}</h1>

          {/* ✅ Paragraph 0 & 1 */}
          {data["leg-content"].slice(0, 2).map((paragraph, index) => (
            <p key={index} className="leg-paragraph">
              {paragraph}
            </p>
          ))}

          {/* ✅ sisanya jadi list */}
          <ul className="leg-ul">
            {data["leg-content"].slice(2).map((item, index) => (
              <li key={index} className="leg-li">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer tetap paling bawah */}
      <div className="leg-side">
        <Copyright lang={lang} />
      </div>
    </div>
  );
};

export default Leg;
