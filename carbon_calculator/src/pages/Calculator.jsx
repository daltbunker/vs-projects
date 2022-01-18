import React, {useState} from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import './Calculator.css'
import Navbar from '../components/Navbar'
import DisplayEstimate from '../components/DisplayEstimate'
import FormContainer from '../components/FormContainer'
import Electricity from '../forms/Electricity'
import Flights from '../forms/Flights'
import Vehicle from '../forms/Vehicle'
import Shipping from '../forms/Shipping'

export default function Calculator() {
    const [labelVisble, setLabelVisible] = useState(false)
    let labelTimer;

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
                <button onMouseOver={() => displayLabel()} onMouseLeave={() => hideLabel()} className="estimates-btn"></button>
                <div className="estimates-label" style={{display: labelVisble ? "block" : "none"}}>saved estimates</div>
            </div>
            <Navbar />
            <FormContainer>
                <Routes>
                    <Route path="/electricity" element={<Electricity />} />
                    <Route path="/flights" element={<Flights />} />
                    <Route path="/vehicle" element={<Vehicle />} />
                    <Route path="/shipping" element={<Shipping />} />
                </Routes>
            </FormContainer>
            <DisplayEstimate />
        </div>
    )
}
