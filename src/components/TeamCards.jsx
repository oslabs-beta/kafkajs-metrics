import React from "react";

export default function TeamCards({ img, name }) {
    return (
        <div className="TeamCard">
           <img className="teamImg" src={img}  />
            <h3>{name}</h3>
            <button onClick="#">Linkedin</button>
        </div>
    )
}