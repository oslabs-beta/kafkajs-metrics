import React from 'react';
import { Link } from 'react-router-dom';
import kjsmLogo from '../../assets/logos/KJSM.png';

// Navbar is called by App outside of React Router and thus appears on top of all 4 React pages
export default function Navbar() {
  return (
    <nav>
      <a href="/">
        <img className="logo" src={kjsmLogo} />
      </a>
      <div className="links">
        <Link to="/visualizer">Visualizer</Link>
        <a href="/docs/index.html">Docs</a>
        <a href="https://github.com/oslabs-beta/kafkaMetrics.git">GitHub</a>
        <Link to="/team">Team</Link>
      </div>
    </nav>
  );
}
