import React from 'react';
import { Link } from 'react-router-dom';

function SideBar() {
    return (
        <nav>
        <ul>
            <Link to='/mainChartPage/consumer'>Consumer</Link>
            <Link to='/mainChartPage/producer'>Producer</Link>
        </ul>
        </nav>
    )
}

export default SideBar;