import React from 'react'
import {NavLink} from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
    return (
        <div className="Navbar">
            <NavLink 
                className="nav-link"
                to="/calculator/electricity" 
                style={({ isActive }) => {
                    return {
                        borderBottom: isActive ? "2px solid black" : "none"
                    };
                }}
            >
                Electricity
            </NavLink>
            <NavLink 
                className="nav-link"
                to="/calculator/flights" 
                style={({ isActive }) => {
                    return {
                        borderBottom: isActive ? "2px solid black" : "none"
                    };
                    }}
            >
                Flights
            </NavLink>
            <NavLink 
                className="nav-link"
                to="/calculator/vehicle" 
                style={({ isActive }) => {
                    return {
                        borderBottom: isActive ? "2px solid black" : "none"
                    };
                    }}
            >
                Vehicle
            </NavLink>
            <NavLink 
                className="nav-link"
                to="/calculator/shipping" 
                style={({ isActive }) => {
                    return {
                        borderBottom: isActive ? "2px solid black" : "none"
                    };
                }}
            >
                Shipping
            </NavLink>
        </div>
    )
}
