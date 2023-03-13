import React from 'react';
import { Link } from 'react-router-dom';
import kjsmLogo from '../../assets/logos/KJSM.png';

export default function Navbar() {
  return (
    <nav>
      <a href="/">
        <img className="logo" src={kjsmLogo} />
      </a>
      <div className="links">
        <Link to="/visualizer">Visualizer</Link>
        <a href="https://github.com/oslabs-beta/kafkaMetrics.git">Docs</a>
        <a href="https://github.com/oslabs-beta/kafkaMetrics.git">GitHub</a>
        <Link to="/team">Team</Link>
      </div>
    </nav>
  );
}
