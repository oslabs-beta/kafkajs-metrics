import React from 'react';
import { Link } from 'react-router-dom';

function SideBar() {
    return (
        <div className='sidebarContainer'>
        <ul>
            <Link to='/mainChartPage/consumer'>Consumer</Link>
        </ul>
        </div>
    )
}

export default SideBar;