import React from 'react'
import './EstimateCard.css'

export default function EstimateCard(props) {

    function getEstimateHeader() {
        if (props.data.type === "electricity") {
            const {type, country, electricity_value, electricity_unit} = props.data
            return (
                <div className="estimate-data estimate-header">
                    <div className="header-title">{type}</div>
                    <div className="header-input">
                        {electricity_value} {electricity_unit} ({country})
                    </div>
                </div>
            )
        } else if (props.data.type === "flights") {
            const {type, legs} = props.data
            return (
                <div className="estimate-data estimate-header">
                    <div className="header-title">{type}</div>
                    <div className="header-input">
                        {legs[0].departure_airport} &#8594; {legs[0].destination_airport}
                    </div>
                </div>
            )
        } else if (props.data.type === "shipping") {
            const {type, transport_method, distance_unit, distance_value, weight_unit, weight_value} = props.data
            return (
                <div className="estimate-data estimate-header">
                    <div className="header-title">{type}: {transport_method}</div>
                    <div className="header-input">
                        {distance_value}({distance_unit}) - {weight_value}({weight_unit}) 
                    </div>
                </div>
            )
        } else if (props.data.type === "vehicle") {
            // const {type, transport_method, distance_unit, distance_value, weight_unit, weight_value} = props.data
            // return (
            //     <div className="estimate-data estimate-header">
            //         <div className="header-title">{type}: {transport_method}</div>
            //         <div className="header-input">
            //             {distance_value}({distance_unit}) - {weight_value}({weight_unit}) 
            //         </div>
            //     </div>
            // )
        }
    }

    return (
        <div className="EstimateCard">
            {getEstimateHeader()}
            <div className="estimate-data"><span>Grams: </span>{props.data.carbon_g}</div>
            <div className="estimate-data"><span>Pounds: </span>{props.data.carbon_lb}</div>
            <div className="estimate-data"><span>Kilograms: </span>{props.data.carbon_kg}</div>
            <div className="estimate-data"><span>Tons: </span>{props.data.carbon_mt}</div>
        </div>
    )
}
