import React from 'react';
import { Link } from 'react-router-dom';

// footer with legal disclaimer and links, used on HomePage
export default function Footer() {
  return (
    <nav className="footer">
      <div className="disclaimer">
        <p>
          KAFKA is a registered trademark of The Apache Software Foundation and
          has been licensed for use by KafkaJSMetrics. KafkaJSMetrics has no
          affiliation with and is not endorsed by The Apache Software
          Foundation.
        </p>
      </div>
      <div className="links">
        <Link to="/visualizer">Visualizer</Link>
        <a href="/docs/index.html">Docs</a>
        <a href="https://github.com/oslabs-beta/kafkajs-metrics.git">GitHub</a>
        <Link to="/team">Team</Link>
      </div>
    </nav>
  );
}
