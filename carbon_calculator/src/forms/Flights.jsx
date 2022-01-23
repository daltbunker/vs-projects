import React, {useState, useContext} from 'react'
import './Forms.css'
import './Flights.css'
import axios from 'axios'
import config from '../config'
import { EstimatesContext } from '../components/EstimatesContext'

export default function Flights() {

    const defaultFormInput = {
        type: "flight",
        passengers: 1,
        legs: [
          {departure_airport: "", destination_airport: ""},
        ]
    }
    const {addEstimate} = useContext(EstimatesContext)
    const [formInput, setFormInput] = useState(defaultFormInput)
    const [searchResults, setSearchResults] = useState([])
    const [departSearch, setDepartSearch] = useState(true)
    const {airports} = require('../locationData.json')

    function handleValueChange(e) {
        const {name, value} = e.target
        let num = 0

        if (value !== "") {
            num = parseInt(value)
        }

        setFormInput(prevFormInput => {
            return {
                ...prevFormInput,
                [name]: num
            }
        })
    }

    function handleAirportChange(e) {
        let {name, value} = e.target
        
        // capitalize value
        if (value.length > 0) {
            value = value[0].toUpperCase() + value.slice(1,)
        }
        
        filterSearchResults(value)
        setFormInput(prevFormInput => {
            return {
                ...prevFormInput,
                legs : [
                    {
                        ...prevFormInput.legs[0],
                        [name]: value
                    }
                ]
            }
        })
    }

    function filterSearchResults(value) {
        if (value.length > 0) {
            const airportList = Object.keys(airports)
            const searchParam = new RegExp(value)
            const results = airportList.filter(airport => searchParam.test(airport))
            setSearchResults(results)
        } else {
            setSearchResults([])
        }
    }

    function handleSearchResultSelect(airport, name) {
        setSearchResults([])
        setFormInput(prevFormInput => {
            return {
                ...prevFormInput,
                legs : [
                    {
                        ...prevFormInput.legs[0],
                        [name]: airports[airport]
                    }
                ]
            }
        })
    }

    function handleAirportInputSelect(isDepart) {
        setDepartSearch(isDepart)
        setSearchResults([])
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (validateInput()) {
            
            axios
                .post("https://www.carboninterface.com/api/v1/estimates", formInput, config)
                .then(resp => {
                    const carbonEstimateObj = resp.data.data.attributes
                    addEstimate(carbonEstimateObj)
                })
        }
    }

    function validateInput() {
        if (formInput.passengers < 1) {
            alert("At least 1 passenger required")
            return false
        } else if (formInput.legs[0].departure_airport.length !== 3 || formInput.legs[0].destination_airport.length !== 3) {
            alert("Airports must be 3 character IATA code")
            return false
        } 
        return true
    }



    return (
        <div className="form-container">
            <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
                <div className="input-container">
                    <label>Passengers: </label>
                    <input 
                        type="number" 
                        name="passengers" 
                        value={formInput.passengers}
                        onChange={handleValueChange} 
                    />
                </div>
                <div className="input-container">
                    <label>Departure: </label>
                    <input 
                        type="text" 
                        name="departure_airport" 
                        value={formInput.legs[0].departure_airport} 
                        onChange={handleAirportChange} 
                        onClick={() => handleAirportInputSelect(true)}
                    />
                    <div className="search-results" style={{display: searchResults.length > 0 && departSearch ? "block" : "none"}}>
                        {searchResults.map(result => 
                            (  
                                <div 
                                    key={result} 
                                    className="search-result" 
                                    onClick={() => handleSearchResultSelect(result, "departure_airport")}>{result}
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className="input-container">
                    <label>Destination: </label>
                    <input 
                        type="text" 
                        name="destination_airport" 
                        value={formInput.legs[0].destination_airport} 
                        onChange={handleAirportChange} 
                        onClick={() => handleAirportInputSelect(false)}
                    />
                    <div className="search-results" style={{display: searchResults.length > 0 && !departSearch ? "block" : "none"}}>
                        {searchResults.map(result => 
                            (  
                                <div 
                                    key={result} 
                                    className="search-result" 
                                    onClick={() => handleSearchResultSelect(result, "destination_airport")}>{result}
                                </div>
                            )
                        )}
                    </div>
                </div>
                <button className="form-submit">Get Estimate</button>
            </form>
        </div>
    )
}
