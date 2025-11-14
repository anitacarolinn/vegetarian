import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './CurrentStats.css';

ChartJS.register(ArcElement, Tooltip, Legend);

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch country data
    axios.get('/api/get-survey-data')
      .then(response => {
        if (response.data.country_data) {
          setCountryData(response.data.country_data);
          setTotalPeople(response.data.total_count);
        }
      })
      .catch(error => console.error("Error fetching country data:", error));

    // Fetch time stats
    axios.get('/api/get-time-stats')
      .then(response => {
        if (response.data) {
          setTimeStats(response.data.time_stats);
          setTotalMeals(response.data.total_meals);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching time stats:", error);
        setLoading(false);
      });
  }, []);

  // Multi-language translations
  const translations = {
    zh: {
      timeStatLabels: {
        '1day': '茹素一天',
        '1day_week': '茹素一週一天',
        '1month': '茹素一個月',
        '1year': '茹素一年',
        'lifetime': '一生一世茹素',
        'always': '生生世世茹素',
      },
      goalTitle: '總目標',
      goalNumber: '100,000,000',
      mealProgress: '餐進度',
      totalPeople: '發願總人數：',
      personUnit: '(人)',
      totalMeals: '累積發願茹素餐數：',
      mealUnit: '(餐)',
      note1: '※發願.「一輩子」、「生生世世」累計餐數以一年計',
      note2: '※本頁每小時更新累計成果一次',
      loading: '載入中...',
      backHome: '回首頁',
      personLabel: '人',
      copyright1: 'Copyright © 2020 Open Source Matters. 版權所有.',
    },
    en: {
      timeStatLabels: {
        '1day': 'Vegetarian for 1 day',
        '1day_week': 'Vegetarian 1 day/week',
        '1month': 'Vegetarian for 1 month',
        '1year': 'Vegetarian for 1 year',
        'lifetime': 'Vegetarian for lifetime',
        'always': 'Vegetarian for all lifetimes',
      },
      goalTitle: 'Total Goal',
      goalNumber: '100,000,000',
      mealProgress: 'Meal Progress',
      totalPeople: 'Total Pledgers: ',
      personUnit: '(people)',
      totalMeals: 'Total Vegetarian Meals Pledged: ',
      mealUnit: '(meals)',
      note1: '※ "Lifetime" and "All lifetimes" pledges are calculated as one year',
      note2: '※ This page updates hourly',
      loading: 'Loading...',
      backHome: 'Back to Home',
      personLabel: 'people',
      copyright1: 'Copyright © 2020 Open Source Matters. All Rights Reserved.',
    },
    es: {
      timeStatLabels: {
        '1day': 'Vegetariano por 1 día',
        '1day_week': 'Vegetariano 1 día/semana',
        '1month': 'Vegetariano por 1 mes',
        '1year': 'Vegetariano por 1 año',
        'lifetime': 'Vegetariano de por vida',
        'always': 'Vegetariano por todas las vidas',
      },
      goalTitle: 'Meta Total',
      goalNumber: '100,000,000',
      mealProgress: 'Progreso de Comidas',
      totalPeople: 'Total de Compromisos: ',
      personUnit: '(personas)',
      totalMeals: 'Total de Comidas Vegetarianas Comprometidas: ',
      mealUnit: '(comidas)',
      note1: '※ Los compromisos de "toda la vida" se calculan como un año',
      note2: '※ Esta página se actualiza cada hora',
      loading: 'Cargando...',
      backHome: 'Volver al Inicio',
      personLabel: 'personas',
      copyright1: 'Copyright © 2020 Open Source Matters. Todos los derechos reservados.',
    },
  };

  const t = translations[lang] || translations.zh;

  const timeStatColors = {
    '1day': '#C46D4D',
    '1day_week': '#C0A843',
    '1month': '#328C79',
    '1year': '#757E2A',
    'lifetime': '#993779',
    'always': '#503999',
  };

  // Chart color palette
  const chartColors = [
    '#757E2A', '#993779', '#6F2580', '#3A6999', '#C0A843', '#C46D4D',
    '#328C79', '#503999', '#8B4513', '#4B0082', '#2F4F4F', '#8B008B',
    '#556B2F', '#8B0000', '#483D8B', '#2E8B57', '#B8860B', '#CD5C5C'
  ];

  // Prepare chart data
  const chartData = {
    labels: countryData.map(country => country.country_name),
    datasets: [{
      data: countryData.map(country => country.count),
      backgroundColor: chartColors,
      borderWidth: 2,
      borderColor: '#fff',
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 12,
        },
        borderRadius: 8,
        callbacks: {
          label: function(context) {
            return context.label + ': ' + context.parsed + ' ' + t.personLabel;
          }
        }
      }
    },
    cutout: '65%', // Creates the donut hole
  };

  return (
    <div className="tzuchi-stats-page">
      <div id="b-mainA">
        <div className="container">
          {/* Logo */}
          <div className="logo" onClick={() => window.location.href = 'https://www.tzuchi.org.tw/'}>
            <img src="/src/assets/current-stats files/logo1.png" alt="Logo" />
          </div>

          <div className="youle">
            <div style={{ padding: '10px' }}>
              {/* Back Home Button */}
              <div style={{ position: 'relative' }} id="pcx">
                <div className="p4-backhome">
                  <Link to={lang === 'zh' ? '/' : `/${lang}`}>
                    <img src="/src/assets/current-stats files/backhome.svg" alt="Back to Home" title={t.backHome} />
                  </Link>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="formroid">
                {/* Chart/Map Area */}
                <div className="earth">
                  <div className="chart-container">
                    {/* Donut Chart */}
                    <div className="donut-chart">
                      {countryData.length > 0 ? (
                        <Doughnut data={chartData} options={chartOptions} />
                      ) : (
                        <div className="loading-chart">{t.loading}</div>
                      )}
                    </div>
                    {/* Earth Image in Center */}
                    <div className="earth-center">
                      <img
                        src="/earh1.gif"
                        alt="Rotating Earth"
                        className="earth-gif"
                      />
                    </div>
                  </div>
                </div>

                {/* Stats Sidebar */}
                <div className="veatsum" id="dropdown">
                  {/* Goal Progress */}
                  <div style={{ width: '100%' }}>
                    <div className="hrse1">
                      <span className="txt0">{t.goalTitle}</span>
                      <span className="txt0-1">{t.goalNumber}</span>
                      <span className="txt0">{t.mealProgress}</span>
                    </div>
                    <div className="hrse"></div>
                  </div>

                  {/* Vegetarian Time Stats */}
                  <nav>
                    <ul id="nav">
                      {Object.entries(timeStats).map(([key, value]) => (
                        <li key={key}>
                          <div className="vetday">
                            <img src="/src/assets/current-stats files/icon.svg" alt="icon" />
                            &nbsp;<span className="txt1">{t.timeStatLabels[key]}</span>
                          </div>
                          <div className="vettotle">
                            <span className="txt2">{Number(value).toLocaleString()}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  {/* Total People */}
                  <div style={{ width: '100%' }}>
                    <div className="hrse2">
                      <span className="txt1">{t.totalPeople}</span>
                      <span className="txt2" id="poptot">{totalPeople.toLocaleString()}</span>
                      <span className="txt3">{t.personUnit}</span>
                    </div>
                    <div className="hrse3"></div>
                  </div>

                  {/* Total Meals */}
                  <div style={{ width: '100%', clear: 'both' }}>
                    <span className="txt1">{t.totalMeals}</span>
                    <span className="txt2" id="eattotole1">{totalMeals.toLocaleString()}</span>
                    <span className="txt3">{t.mealUnit}</span>
                    <br />
                    <span className="txt1">{t.note1}</span>
                    <br />
                    <span className="txt1">{t.note2}</span>
                  </div>
                </div>
              </div>

              {/* Country Legend */}
              <div id="legend_div">
                {countryData.map((country, index) => (
                  <div className="legend-marker" data-rowindex={index} key={index}>
                    <div className="legend-marker-color" style={{ backgroundColor: chartColors[index % chartColors.length] }}></div>
                    <span>{country.country_name} ({country.count})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div id="b-footer">
        <div className="footer-content">
          <div className="footer1">{t.copyright1}</div>
          <div className="footer2">
            Copyright, <a href="https://go-vegetarian.tzuchi.org.tw/">Tzu Chi Foundation.</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentStats;
