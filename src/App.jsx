import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import HomePage from './components/Home.jsx';
import MainTokenPage from './components/mainTokenPage.jsx';
import MainChartPage from './components/mainChartPage.jsx';
import TeamPage from './components/TeamPage.jsx';

export default function App() {
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/visualizer" element={<MainTokenPage />} />
          <Route
            path="/mainChartPage/consumer"
            element={<MainChartPage type="consumer" />}
          ></Route>
          <Route path="/team" element={<TeamPage />} />
        </Routes>
      </div>
    </div>
  );
}
