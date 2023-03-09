import React from "react";

export default function KeyFeatureComponent(props) {
    return (
        <div className="keyFeatureCard">
            <img src={props.img}/>
            <h3>{props.name}</h3>
            <div className="keyFeatureCardInfo">
                <p>{props.desc}</p>
            </div>
    
        </div>
    )
}