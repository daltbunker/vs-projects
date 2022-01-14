import React from 'react'
import {Routes, Route, useParams} from 'react-router-dom'
import Navbar from '../components/Navbar'
import DisplayEstimate from '../components/DisplayEstimate'
import FormContainer from '../components/FormContainer'

export default function Calculator() {
    const {estimateType} = useParams()

    return (
        <div className="Calculator">
            <div className="header">
                <div className="title">Carbon Calculator</div>
                <button>SAVED ESTIMATES</button>
            </div>
            <div className="subtitle">{estimateType}</div>
            <Navbar />
            <FormContainer>
                <Routes>
                    <Route />
                </Routes>
            </FormContainer>
            <DisplayEstimate />
        </div>
    )
}
