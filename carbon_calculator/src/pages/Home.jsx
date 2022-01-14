import React from 'react'
import './Home.css'
import {Link, Outlet} from 'react-router-dom'
import Electricity from '../forms/Electricity'
import Flights from '../forms/Flights'
import Vehicle from '../forms/Vehicle'
import Shipping from '../forms/Shipping'


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
            <Outlet />
        </div>
    )
}
