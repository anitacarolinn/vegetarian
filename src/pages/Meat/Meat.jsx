import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import textData from "../../lang.json";
import "./Meat.css";
import Copyright from "../../components/Copyright/Copyright";
import earth from "../../assets/earth.svg"; // ✅ tambahkan ini
import logo from '../../assets/logo.png';

const Meat = ({ lang }) => {
  const data = textData.vegetarian[lang];
  const path = lang === "zh" ? "" : `${lang}`;

  return (
    <div className="meat-fullwidth">
      <div className="meat-top-bar">
        <a
          href="https://www.tzuchi.org.tw/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} alt="Logo" className="meat-logo" />
        </a>

        <div className="meat-nav-buttons">
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
      <div className="meat-layout">
        <div className="meat-left">
          <img src={earth} alt="Earth" className="earth-img" />
        </div>

        {/* ✅ scroll hanya bagian ini */}
        <div className="meat-right">
          <h1 className="meat-title">{data["meat-title"]}</h1>

          {/* ✅ Paragraph 0,1,2 */}
          {data["meat-content"].slice(0, 3).map((paragraph, index) => (
            <p key={index} className="meat-paragraph">
              {paragraph}
            </p>
          ))}

          {/* ✅ Middle content jadi ul biasa */}
          <ul className="meat-ul">
            {data["meat-content"].slice(3, -3).map((item, index) => (
              <li key={index} className="meat-li">
                {item}
              </li>
            ))}
          </ul>

          {/* ✅ 3 terakhir, inline list, link bisa diklik */}
          <ul className="meat-ul-inline">
            {data["meat-content"].slice(-3).map((item, index) => (
              <li key={index} className="meat-li-inline">
                {item.includes("http") ? (
                  <a href={item} target="_blank" rel="noopener noreferrer">
                    {item}
                  </a>
                ) : (
                  item
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer tetap paling bawah */}
      <div className="meat-side">
        <Copyright lang={lang} />
      </div>
    </div>
  );
};

export default Meat;
