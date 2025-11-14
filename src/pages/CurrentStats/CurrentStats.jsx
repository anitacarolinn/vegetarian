import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Import styles from the downloaded template
import '../../assets/current-stats files/reset.css';
import '../../assets/current-stats files/template.css';
import '../../assets/current-stats files/k2style.css';
import '../../assets/current-stats files/menu.css';
import '../../assets/current-stats files/jquery.mCustomScrollbar.css';
import '../../assets/current-stats files/all.css';
import './CurrentStats.css'; // Keep our own CSS for overrides if needed

// Import images
import logo from '../../assets/current-stats files/logo1.png';
import backhome from '../../assets/current-stats files/backhome.svg';
import icon from '../../assets/current-stats files/icon.svg';
import bgImage from '../../assets/bg1.jpg';

const CurrentStats = ({ lang }) => {
  const [countryData, setCountryData] = useState([]);
  const [timeStats, setTimeStats] = useState({
    '1day': 0,
    '1day_week': 0,
    '1month': 0,
    '1year': 0,
    'lifetime': 0,
    'always': 0,
  });
  const [totalPeople, setTotalPeople] = useState(0);
  const [totalMeals, setTotalMeals] = useState(0);

  useEffect(() => {
    // Fetch country data
    axios.get('/api/get_survey_data.php')
      .then(response => {
        if (response.data.country_data) {
          setCountryData(response.data.country_data);
          setTotalPeople(response.data.total_count);
        }
      })
      .catch(error => console.error("Error fetching country data:", error));

    // Fetch time stats
    axios.get('/api/get_time_stats.php')
      .then(response => {
        if (response.data) {
          setTimeStats(response.data.time_stats);
          setTotalMeals(response.data.total_meals);
        }
      })
      .catch(error => console.error("Error fetching time stats:", error));
  }, []);

  const timeStatLabels = {
    '1day': '茹素一天',
    '1day_week': '茹素一週一天',
    '1month': '茹素一個月',
    '1year': '茹素一年',
    'lifetime': '一生一世茹素',
    'always': '生生世世茹素',
  };

  // Style for the background
  const pageStyle = {
    backgroundImage: `url(${bgImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  return (
    <div style={pageStyle}>
      <div id="b-mainA">
        <div className="container">
          <div className="logo" style={{ cursor: 'pointer' }} onClick={() => window.location.href = 'http://www.tzuchi.org.tw/'}>
            <img src={logo} alt="Logo" />
          </div>
          <div className="youle">
            <div style={{ padding: '10px' }}>
              <div style={{ position: 'relative' }} id="pcx">
                <div className="p4-backhome">
                  <Link to={`/${lang || 'en'}`}>
                    <img src={backhome} alt="Back to Home" title="回首頁" />
                  </Link>
                </div>
              </div>
              <div className="formroid" style={{ minHeight: '405px' }}>
                <div className="earth">
                  {/* Chart will be placed here */}
                  <div id="dashboard_div" style={{ width: '100%', height: '100%' }}>
                    <div id="chart_div" style={{ width: '100%', height: '100%' }}>
                        <p style={{textAlign: 'center', paddingTop: '50px', color: 'white'}}>Chart placeholder</p>
                    </div>
                  </div>
                </div>
                <div className="veatsum" id="dropdown">
                  <div style={{ width: '100%' }}>
                    <div className="hrse1">
                      <span className="txt0">總目標</span>
                      <span className="txt0-1">100,000,000</span>
                      <span className="txt0">餐進度</span>
                    </div>
                    <div className="hrse"></div>
                  </div>
                  <nav>
                    <ul id="nav">
                      {Object.entries(timeStats).map(([key, value]) => (
                        <li key={key}>
                          <div className="vetday">
                            <img src={icon} alt="icon" />&nbsp;
                            <span className="txt1">{timeStatLabels[key]}</span>
                          </div>
                          <div className="vettotle">
                            <span className="txt2">{Number(value).toLocaleString()}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div style={{ width: '100%' }}>
                    <div className="hrse2">
                      <span className="txt1">發願總人數：</span>
                      <span className="txt2" id="poptot">{totalPeople.toLocaleString()}</span>
                      <span className="txt3">(人)</span>
                    </div>
                    <div className="hrse3"></div>
                  </div>
                  <div style={{ width: '100%', clear: 'both' }}>
                    <span className="txt1">累積發願茹素餐數：</span>
                    <span className="txt2" id="eattotole1">{totalMeals.toLocaleString()}</span>
                    <span className="txt3">(餐)</span>
                    <br />
                    <span className="txt1">※發願.「一輩子」、「生生世世」累計餐數以一年計<br />※本頁每小時更新累計成果一次</span>
                  </div>
                </div>
              </div>
              <div id="legend_div">
                {countryData.map((country, index) => (
                  <div className="legend-marker" data-rowindex={index} key={index}>
                    <div className="legend-marker-color" style={{ backgroundColor: '#757E2A' }}></div>
                    <span>{country.country_name} ({country.count})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="b-footer">
        <div className="footer-content">
          <div className="footer1">Copyright © 2020 Open Source Matters. 版權所有.</div>
          <div className="footer2">Copyright, <a href="https://go-vegetarian.tzuchi.org.tw/">Tzu Chi Foundation.</a></div>
        </div>
      </div>
    </div>
  );
};

export default CurrentStats;