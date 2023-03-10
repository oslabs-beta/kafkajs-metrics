import React from 'react';
import TeamCards from './TeamCards.jsx';
import AmandaImg from "../../assets/Amanda.png";
import RebeccaImg from "../../assets/Rebecca.png";
import JoshImg from "../../assets/Josh.png";
import PaulImg from "../../assets/Paul.png";
import RananImg from "../../assets/Ranan.png";

export default function TeamPage() {
    return (
    <div>
      <div className='TeamCardContainer'>
        <div className="TeamCardContainerContents">
        <div className="TeamContents">
        <h1>Meet the Team</h1>
        <div className="TeamCardComponents">
            <TeamCards 
                img={AmandaImg}
                name="Amanda Smith"
            />
            <TeamCards  
                img={RebeccaImg}
                name="Rebecca Anderson"
            />
            <TeamCards  
                img={PaulImg}
                name="Paul Davey"
            />
            <TeamCards 
                img={JoshImg}
                name="Joshwa Tesoro"
            />
            <TeamCards 
                img={RananImg}
                name="Ranan Hui"
            />
        </div>    
        </div>
        </div>
      </div>
    </div>
    );
}