import React from 'react';

export default function ImageCard(props) {
  return (
    <div className="card">
      <img src={props.img} />
      <h3>{props.name}</h3>
      <p>{props.desc}</p>
    </div>
  );
}
