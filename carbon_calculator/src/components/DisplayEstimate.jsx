import React, {useContext} from 'react'
import './DisplayEstimate.css'
import { EstimatesContext } from './EstimatesContext'


function DisplayEstimate() {
    
    const {carbonEstimate} = useContext(EstimatesContext)
    return (
        <div className="DisplayEstimate">
            <div className="estimate-title">Carbon Estimate</div>
            <div className="estimate-data"><span>Grams: </span>{carbonEstimate.carbon_g}</div>
            <div className="estimate-data"><span>Pounds: </span>{carbonEstimate.carbon_lb}</div>
            <div className="estimate-data"><span>Kilograms: </span>{carbonEstimate.carbon_kg}</div>
            <div className="estimate-data"><span>Tons: </span>{carbonEstimate.carbon_mt}</div>
        </div>
    )
}

export default DisplayEstimate