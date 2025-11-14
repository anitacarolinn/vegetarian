import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrentStatsSimple = ({ lang }) => {
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
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('CurrentStatsSimple: Starting to fetch data...');

    // Fetch country data
    axios.get('/api/get-survey-data')
      .then(response => {
        console.log('Country data response:', response.data);
        if (response.data.country_data) {
          setCountryData(response.data.country_data);
          setTotalPeople(response.data.total_count);
        }
      })
      .catch(error => {
        console.error("Error fetching country data:", error);
        setError('無法載入國家統計資料: ' + error.message);
      });

    // Fetch time stats
    axios.get('/api/get-time-stats')
      .then(response => {
        console.log('Time stats response:', response.data);
        if (response.data) {
          setTimeStats(response.data.time_stats);
          setTotalMeals(response.data.total_meals);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching time stats:", error);
        setError('無法載入時間統計資料: ' + error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1>載入中...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', color: 'red' }}>
        <h1>錯誤</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>素食承諾統計頁面（簡化版）</h1>

      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>總計</h2>
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>總人數: {totalPeople} 人</p>
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>總餐數: {totalMeals.toLocaleString()} 餐</p>
      </div>

      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>各國統計</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>國家</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>人數</th>
            </tr>
          </thead>
          <tbody>
            {countryData.map((country, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{country.country_name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{country.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>素食時長統計</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>類別</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>人數</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>茹素一天</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{timeStats['1day']}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>茹素一週一天</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{timeStats['1day_week']}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>茹素一個月</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{timeStats['1month']}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>茹素一年</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{timeStats['1year']}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>一生一世茹素</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{timeStats['lifetime']}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>生生世世茹素</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{timeStats['always']}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            padding: '10px 30px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          返回首頁
        </button>
      </div>
    </div>
  );
};

export default CurrentStatsSimple;
