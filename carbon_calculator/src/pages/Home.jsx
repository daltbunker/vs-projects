import React from 'react'
import './Home.css'
import {Link} from 'react-router-dom'



export default function Home() {
    return (
        <div className="Home">
            <div className="title">CARBON CALCULATOR</div>
            <div className="estimate-links">
                <Link to="/calculator/electricity">Electricity</Link>
                <Link to="/calculator/flights">Flights</Link>
                <Link to="/calculator/vehicle">Vehicle</Link>
                <Link to="/calculator/shipping">Shipping</Link>
            </div>
        </div>
    )
}
