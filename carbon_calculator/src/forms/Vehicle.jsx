import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './Forms.css'
import config from '../config'

export default function Vehicle() {

    const defaultFormInput = {
        type: "vehicle",
        distance_unit: "mi",
        distance_value: 100,
        vehicle: {
            vehicle_make: "",
            vehicle_model: ""
        },
      }
      const [formInput, setFormInput] = useState(defaultFormInput)
    const [vehicleMakes, setVehicleMakes] = useState([])
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        axios
            .get("https://www.carboninterface.com/api/v1/vehicle_makes", config)
            .then(resp => {
                const allMakes = resp.data.map(make => ({name: make.data.attributes.name, id: make.data.id}))
                setVehicleMakes(allMakes)
            })
    }, [])

    function handleInputChange(e) {
        const {name, value} = e.target
        let num = 0

        if (name === "distance_value" && value !== "") {
            num = parseInt(value)
        }

        setFormInput(prevFormInput => {
            return {
                ...prevFormInput,
                [name]: name === "distance_value" ? num : value
            }
        })
    }
    
    function handleVehicleChange(e) {
        let {name, value} = e.target
        
        // capitalize value
        if (value.length > 0) {
            value = value[0].toUpperCase() + value.slice(1,)
        }
        
        filterSearchResults(value)
        setFormInput(prevFormInput => {
            return {
                ...prevFormInput,
                [name]: value
            }
        })
    }

    function filterSearchResults(value) {
        if (value.length > 0) {
            const searchParam = new RegExp(value)
            const results = vehicleMakes.filter(make => searchParam.test(make.name))
            setSearchResults(results)
        } else {
            setSearchResults([])
        }
    }

    function getModels(id) {
        axios
            .get(`https://www.carboninterface.com/api/v1/vehicle_makes/${id}/vehicle_models`, config)
            .then(resp => console.log(resp.data))


    }

    function handleSearchResultSelect(vehicleMake) {
        getModels(vehicleMake.id)
        setSearchResults([])
        setFormInput(prevFormInput => {
            return {
                ...prevFormInput,
                vehicle: {
                    ...prevFormInput.vehicle,
                    vehicle_make: vehicleMake.name
                }
            }
        })
    }

    function handleSubmit(e) {

    }

    return (
        <div className="form-container">
            <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
            <div className="input-container">
                    <label>Unit: </label>
                    <select name="distance_unit" onChange={handleInputChange}>
                        <option value="mi">mi</option>
                        <option value="km">km</option>
                    </select>
                </div>
                <div className="input-container">
                    <label>Distance: </label>
                    <input type="number" name="distance_value" value={formInput.distance_value} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label>Make: </label>
                    <input type="text" name="vehicle_make_id" value={formInput.vehicle.vehicle_make} onChange={handleVehicleChange} />
                    <div className="search-results" style={{display: searchResults.length > 0 ? "block" : "none"}}>
                        {searchResults.map(result => (  
                            <div 
                                key={result.id} 
                                className="search-result"
                                onClick={() => handleSearchResultSelect(result)}
                            >
                                {result.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="input-container">
                    <label>Model: </label>
                    <input type="text" name="vehicle_model_id" value={formInput.vehicle.vehicle_model} onChange={handleVehicleChange} />
                    <div className="search-results" style={{display: searchResults.length > 0 ? "block" : "none"}}>
                        {searchResults.map(result => (  
                            <div 
                                key={result.id} 
                                className="search-result"
                                onClick={() => handleSearchResultSelect(result)}
                            >
                                {result.name}
                            </div>
                        ))}
                    </div>
                </div>
                <button className="form-submit">Get Estimate</button>
            </form>
        </div>
    )
}
