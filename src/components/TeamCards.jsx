import React from "react";

export default function TeamCards({ img, name }) {
    return (
        <div className="TeamCard">
           <img src={`../../assets/${img}`}  />
            <h3>{name}</h3>
            <button onClick="#">Linkedin</button>
        </div>
    )
}