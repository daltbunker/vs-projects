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
                        opacity: isActive ? "100%" : "50%",
                        fontWeight: "bold"
                    };
                }}
            />
            <NavLink 
                className="nav-link"
                to="/calculator/flights" 
                style={({ isActive }) => {
                    return {
                        opacity: isActive ? "100%" : "50%",
                        fontWeight: "bold"
                    };
                    }}
            />
            <NavLink 
                className="nav-link"
                to="/calculator/vehicle" 
                style={({ isActive }) => {
                    return {
                        opacity: isActive ? "100%" : "50%",
                        fontWeight: "bold"
                    };
                    }}
            />
            <NavLink 
                className="nav-link"
                to="/calculator/shipping" 
                style={({ isActive }) => {
                    return {
                        opacity: isActive ? "100%" : "50%",
                        fontWeight: "bold"
                    };
                }}
            />
        </div>
    )
}
