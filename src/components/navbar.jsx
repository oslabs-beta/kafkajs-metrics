import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar() {
    return (
        <nav className='generalNav'> 
          <h1 className="title"><Link to='/'>KafkaMetricsjs</Link></h1>
          <div className="navbar-links">
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
                <Link to='/team'>Team</Link>
              </li>
           </ul>
          </div>
        </nav>
    )
}