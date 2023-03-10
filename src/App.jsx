import React from 'react';
import Navbar from './components/navbar.jsx';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx';
import MainTokenPage from './components/mainTokenPage.jsx';
import Main from './components/mainChartPage.jsx';
import TeamPage from './components/TeamPage.jsx';

export default function App() {
    return (
        <div>
            <Navbar />
            <div>
                <Routes>
                    <Route exact path = '/' element = {<Home />}/>
                    <Route path = '/visualizer' element = {<MainTokenPage />} />
                    <Route path='/mainChartPage/consumer' element={<Main type='consumer'/>}></Route>
                    <Route path='/team' element={<TeamPage />} />
                </Routes>
            </div>
        </div>
    )
}