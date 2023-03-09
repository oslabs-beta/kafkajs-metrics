import React from "react";

export default function howToComponents(props) {
    return (
        <div className="howToCard">
            <h3>{props.name}</h3>
            <div className="howToCardInfo">
                <p>{props.desc}</p>
            </div>
            <img src={props.img}/>
        </div>
    )
}