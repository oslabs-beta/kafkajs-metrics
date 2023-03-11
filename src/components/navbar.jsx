import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <h1 className="title">
        <Link to="/">KafkaJSMetrics</Link>
      </h1>
      <div className="links">
        <Link to="/visualizer">Visualizer</Link>
        <a href="https://github.com/oslabs-beta/kafkaMetrics.git">Docs</a>
        <a href="https://github.com/oslabs-beta/kafkaMetrics.git">GitHub</a>
        <Link to="/team">Team</Link>
      </div>
    </nav>
  );
}
