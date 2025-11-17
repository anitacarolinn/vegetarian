import "./App.css";
import Home from "./pages/Home/Home";
import Meat from "./pages/Meat/Meat";
import Leg from "./pages/Leg/Leg";
import CurrentStats from "./pages/CurrentStats/CurrentStats";
import CurrentStatsSimple from "./pages/CurrentStats/CurrentStatsSimple";
import FormSurvey from "./pages/VegetarianForm/VegetarianForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* TW (default) */}
          <Route path="/" element={<Home lang="zh" />} />

          {/* English */}
          <Route path="/en" element={<Home lang="en" />} />

          {/* Spanish */}
          <Route path="/es" element={<Home lang="es" />} />

          {/* Meat Page */}
          <Route path="/meat" element={<Meat lang="zh" />} />
          <Route path="/en/meat" element={<Meat lang="en" />} />
          <Route path="/es/meat" element={<Meat lang="es" />} />

          {/* Leg Page */}
          <Route path="/leg" element={<Leg lang="zh" />} />
          <Route path="/en/leg" element={<Leg lang="en" />} />
          <Route path="/es/leg" element={<Leg lang="es" />} />

          {/* CurrentStats Page */}
          <Route path="/currentstats" element={<CurrentStats lang="zh" />} />
          <Route path="/en/currentstats" element={<CurrentStats lang="en" />} />
          <Route path="/es/currentstats" element={<CurrentStats lang="es" />} />

          {/* CurrentStats Simple Test Page */}
          <Route path="/test-stats" element={<CurrentStatsSimple lang="zh" />} />

          {/* FormSurvey Page */}
          <Route path="/form-survey" element={<FormSurvey lang="zh" />} />
          <Route path="/en/form-survey" element={<FormSurvey lang="en" />} />
          <Route path="/es/form-survey" element={<FormSurvey lang="es" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
