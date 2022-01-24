import React, {useState, useEffect, useContext} from 'react'
import {Routes, Route, Link, useParams} from 'react-router-dom'
import './Calculator.css'
import Navbar from '../components/Navbar'
import DisplayEstimate from '../components/DisplayEstimate'
import Electricity from '../forms/Electricity'
import Flights from '../forms/Flights'
import Vehicle from '../forms/Vehicle'
import Shipping from '../forms/Shipping'
import { EstimatesContext } from '../components/EstimatesContext'

export default function Calculator() {

    const [labelVisble, setLabelVisible] = useState(false)
    const {estimateType} = useParams()
    let labelTimer;
    const {clearCarbonEstimate, allEstimates} = useContext(EstimatesContext)

    useEffect(() => {
        clearCarbonEstimate()
    }, [estimateType, clearCarbonEstimate])

    function displayLabel(){
        if (!labelTimer) {
            labelTimer = setTimeout(() => setLabelVisible(true), 600)
        }
    }

    function hideLabel() {
        setLabelVisible(false)
        if (labelTimer) {
            clearTimeout(labelTimer)
            labelTimer = null
        }
    }

    return (
        <div className="Calculator">
            <div className="header">
                <Link className="calculator-title" to="/">Carbon Calculator</Link>
                <Link 
                    className="estimates-btn" 
                    onMouseOver={() => displayLabel()} 
                    onMouseLeave={() => hideLabel()} 
                    style={{visibility: allEstimates.length > 0 ? "visible" : "hidden"}}
                    to="/estimates"
                >
                </Link>
                <div className="estimates-label" style={{display: labelVisble ? "block" : "none"}}>all estimates</div>
            </div>
            <div className="route-title">{estimateType}</div>
            <Navbar />
            <div className="route-container">
                <Routes>
                    <Route path="/electricity" element={<Electricity/>} />
                    <Route path="/flights" element={<Flights/>} />
                    <Route path="/vehicle" element={<Vehicle/>} />
                    <Route path="/shipping" element={<Shipping/>} />
                </Routes>
            </div>
            <DisplayEstimate/>
        </div>
    )
}
