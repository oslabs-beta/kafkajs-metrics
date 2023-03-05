import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav>
        <ul>
            <li>
                <Link to='/'>home</Link>
            </li>
            <li>
                <Link to='/visualizer'>visualizer</Link>
            </li>
        </ul>
        </nav>
    )
}