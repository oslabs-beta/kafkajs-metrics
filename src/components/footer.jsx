import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <nav className='Footer'> 
          <h1 className="title"><a>Copyright © KafkaMetrics  | All right reserved </a></h1>
          <div className="footer-links">
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <a href="https://github.com/oslabs-beta/kafkaMetrics.git">Docs</a>
              </li>
              <li>
                <Link to='/visualizer'>Visualizer</Link>
              </li>
              <li>
                <a href='https://github.com/oslabs-beta/kafkaMetrics.git'>GIT</a>
              </li>
              <li>
                <a href="#">Team</a>
              </li>
           </ul>
          </div>
        </nav>
    )
}