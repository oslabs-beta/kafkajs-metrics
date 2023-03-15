import React from 'react';
import linkedInLogo from '../../assets/logos/LinkedIn.png';
import gitHubLogo from '../../assets/logos/GitHub.png';

// custom cards for TeamPage
export default function TeamCard({ img, name, gitHubLink, linkedInLink }) {
  return (
    <div className="team-card">
      <img src={img} />
      <h3>{name}</h3>
      <p>Software Engineer</p>
      <div className="logo-box">
        <a href={gitHubLink}>
          <img className="logo" src={gitHubLogo} />
        </a>
        <a href={linkedInLink}>
          <img className="logo" src={linkedInLogo} />
        </a>
      </div>
    </div>
  );
}
