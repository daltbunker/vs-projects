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
                        color: isActive ? "rgb(175, 22, 22)" : "black",
                        fontWeight: "bold"
                    };
                }}
            />
            <NavLink 
                className="nav-link"
                to="/calculator/flights" 
                style={({ isActive }) => {
                    return {
                        color: isActive ? "rgb(175, 22, 22)" : "black",
                        fontWeight: "bold"
                    };
                    }}
            />
            <NavLink 
                className="nav-link"
                to="/calculator/vehicle" 
                style={({ isActive }) => {
                    return {
                        color: isActive ? "rgb(175, 22, 22)" : "black",
                        fontWeight: "bold"
                    };
                    }}
            />
            <NavLink 
                className="nav-link"
                to="/calculator/shipping" 
                style={({ isActive }) => {
                    return {
                        color: isActive ? "rgb(175, 22, 22)" : "black",
                        fontWeight: "bold"
                    };
                }}
            />
        </div>
    )
}
