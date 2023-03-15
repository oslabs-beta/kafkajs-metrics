import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import AuthPage from './components/AuthPage.jsx';
import VisualizerPage from './components/VisualizerPage.jsx';
import TeamPage from './components/TeamPage.jsx';

export default function App() {
  return (
    <div>
      <Navbar />
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/visualizer" element={<AuthPage />} />
          <Route
            path="/mainChartPage/consumer"
            element={<VisualizerPage type="consumer" />}
          ></Route>
          <Route path="/team" element={<TeamPage />} />
        </Routes>
      </div>
    </div>
  );
}
