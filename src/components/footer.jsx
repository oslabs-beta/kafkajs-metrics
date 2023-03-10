import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <nav className="Footer">
      <h1 className="title">
        <a>
          KAFKA is a registered trademark of The Apache Software Foundation and
          has been licensed for use by KafkaJSMetrics. KafkaJSMetrics has no
          affiliation with and is not endorsed by The Apache Software
          Foundation.
        </a>
      </h1>
      <div className="footer-links">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="https://github.com/oslabs-beta/kafkaMetrics.git">Docs</a>
          </li>
          <li>
            <Link to="/visualizer">Visualizer</Link>
          </li>
          <li>
            <a href="https://github.com/oslabs-beta/kafkaMetrics.git">GIT</a>
          </li>
          <li>
            <a href="/team">Team</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
