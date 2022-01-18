import React from 'react'
import './Home.css'
import {Link} from 'react-router-dom'



export default function Home() {
    return (
        <div className="Home">
            <div className="title">CARBON CALCULATOR</div>
            <div className="estimate-links">
                <Link to="/calculator/electricity" className=" estimate-link electricity-link"></Link>
                <Link to="/calculator/flights" className=" estimate-link flights-link"></Link>
                <Link to="/calculator/vehicle" className=" estimate-link vehicle-link"></Link>
                <Link to="/calculator/shipping" className=" estimate-link shipping-link"></Link>
            </div>
        </div>
    )
}
