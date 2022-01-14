import React from 'react'
import {NavLink} from 'react-router-dom'

export default function Navbar() {
    return (
        <div className="NavBar">
            <NavLink 
                to="/calculator/electricity" 
                style={({ isActive }) => {
                    return {
                        display: "block",
                        margin: "1rem 0",
                        color: isActive ? "red" : ""
                    };
                }}
            >
                Electricity
            </NavLink>
            <NavLink 
                to="/calculator/flights" 
                style={({ isActive }) => {
                    return {
                        display: "block",
                        margin: "1rem 0",
                        color: isActive ? "red" : ""
                    };
                    }}
            >
                Flights
            </NavLink>
            <NavLink 
                to="/calculator/vehicle" 
                style={({ isActive }) => {
                    return {
                        display: "block",
                        margin: "1rem 0",
                        color: isActive ? "red" : ""
                    };
                    }}
            >
                Vehicle
            </NavLink>
            <NavLink 
                to="/calculator/shipping" 
                style={({ isActive }) => {
                    return {
                        display: "block",
                        margin: "1rem 0",
                        color: isActive ? "red" : ""
                    };
                }}
            >
                Shipping
            </NavLink>
        </div>
    )
}
