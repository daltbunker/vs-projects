import React from 'react'
import {Routes, Route, useParams} from 'react-router-dom'
import Navbar from '../components/Navbar'
import DisplayEstimate from '../components/DisplayEstimate'
import FormContainer from '../components/FormContainer'
import Electricity from '../forms/Electricity'
import Flights from '../forms/Flights'
import Vehicle from '../forms/Vehicle'
import Shipping from '../forms/Shipping'

export default function Calculator() {
    const {estimateType} = useParams()

    return (
        <div className="Calculator">
            <div className="header">
                <div className="calculator-title">Carbon Calculator</div>
                <button>SAVED ESTIMATES</button>
            </div>
            <div className="subtitle">{estimateType}</div>
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
