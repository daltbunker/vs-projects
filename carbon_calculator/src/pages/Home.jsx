import React from 'react'
import './Home.css'
import {Link} from 'react-router-dom'
import Electricity from '../forms/Electricity'
import Flights from '../forms/Flights'
import Vehicle from '../forms/Vehicle'
import Shipping from '../forms/Shipping'


export default function Home() {
    return (
        <div className="Home">
            <div className="title">CARBON CALCULATOR</div>
            <div className="estimate-links">
                <Link to="/carbon-calculator/electricity" element={<Electricity />}>Electricity</Link>
                <Link to="/carbon-calculator/flight" element={<Flights />}>Flight</Link>
                <Link to="/carbon-calculator/vehicle" element={<Vehicle />}>Vehicle</Link>
                <Link to="/carbon-calculator/shipping" element={<Shipping />}>Shipping</Link>
            </div>
        </div>
    )
}
