import React from 'react'
import './EstimateCard.css'

export default function EstimateCard(props) {
    return (
        <div className="EstimateCard">
            <div className="estimate-data"><span>Grams: </span>{props.data.carbon_g}</div>
            <div className="estimate-data"><span>Pounds: </span>{props.data.carbon_lb}</div>
            <div className="estimate-data"><span>Kilograms: </span>{props.data.carbon_kg}</div>
            <div className="estimate-data"><span>Tons: </span>{props.data.carbon_mt}</div>
        </div>
    )
}
