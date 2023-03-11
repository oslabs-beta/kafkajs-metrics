import React from 'react';
import TeamCard from './TeamCard.jsx';
import AmandaImg from '../../assets/team/Amanda.png';
import RebeccaImg from '../../assets/team/Rebecca.png';
import JoshImg from '../../assets/team/Josh.jpg';
import PaulImg from '../../assets/team/Paul.jpg';
import RananImg from '../../assets/team/Ranan.jpg';

export default function TeamPage() {
  return (
    <>
      <div className="homepageSection">
        <h1>Meet the Team</h1>
        <div className="teamCardGrid">
          <TeamCard
            img={RebeccaImg}
            name="Rebecca Anderson"
            gitHubLink="https://github.com/Randers9"
            linkedInLink="https://www.linkedin.com/in/rebecca--anderson/"
          />
          <TeamCard
            img={PaulImg}
            name="Paul Davey"
            gitHubLink="https://github.com/pauldavey1"
            linkedInLink="https://www.linkedin.com/in/paulcdavey/"
          />
          <TeamCard
            img={RananImg}
            name="Ranan Hui"
            gitHubLink="https://github.com/rananhui"
            linkedInLink="https://www.linkedin.com/in/rananhui/"
          />
          <TeamCard
            img={AmandaImg}
            name="Amanda Smith"
            gitHubLink="https://github.com/amsmithf"
            linkedInLink="https://www.linkedin.com/in/amanda-margaret-smith/"
          />
          <TeamCard
            img={JoshImg}
            name="Joshwa Tesoro"
            gitHubLink="https://github.com/jshwatsoro"
            linkedInLink=""
          />
        </div>
      </div>
    </>
  );
}
