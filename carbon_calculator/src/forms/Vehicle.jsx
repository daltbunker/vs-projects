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
            vehicle_model: "",
            year: 1990
        },
      }
    const [formInput, setFormInput] = useState(defaultFormInput)
    const [vehicles, setVehicles] = useState({
        makes: [],
        makeId: "",
        models: [],
        uniqueModels: [],
        years: [],
        modelId: ""
    })
    const [searchResults, setSearchResults] = useState([])
    const [makeSearch, setMakeSearch] = useState(true)

    useEffect(() => {
        axios
            .get("https://www.carboninterface.com/api/v1/vehicle_makes", config)
            .then(resp => {
                const allMakes = resp.data.map(make => ({name: make.data.attributes.name, id: make.data.id}))
                setVehicles(prevVehicles => {
                    return {
                        ...prevVehicles,
                        makes: allMakes
                    }
                })
            })
    }, [])

    function handleDistanceChange(e) {
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
    
    function handleVehicleInputChange(e) {
        let {name, value} = e.target
        
        // capitalize value
        if (value.length > 0) {
            value = value[0].toUpperCase() + value.slice(1,)
        }
        
        filterSearchResults(name, value)
        setFormInput(prevFormInput => {
            return {
                ...prevFormInput,
                vehicle: {
                    ...prevFormInput.vehicle,
                    [name]: value
                }
            }
        })
    }

    function filterSearchResults(name, value) {
        if (value.length > 0) {
            const searchParam = new RegExp(value)
            if (name === "vehicle_make") {
                const results = vehicles.makes.filter(vehicle => searchParam.test(vehicle.name))
                setSearchResults(results)
            } else {
                const results = vehicles.uniqueModels.filter(vehicle => searchParam.test(vehicle))
                setSearchResults(results)
                console.log(results)
            }
        } else {
            setSearchResults([])
        }
    }

    function getModels(id) {
        axios
            .get(`https://www.carboninterface.com/api/v1/vehicle_makes/${id}/vehicle_models`, config)
            .then(resp => {
                const allModels = resp.data.map(model => ({name: model.data.attributes.name, year: model.data.attributes.year, id: model.data.id}))
                setVehicles(prevVehicles => {
                    return {
                        ...prevVehicles,
                        models: allModels,
                        uniqueModels: [...new Set(allModels.map(model => model.name))]
                    }
                })
            })
    }

    function handleVehicleInputSelect(isVehicleMake) {
        setMakeSearch(isVehicleMake)
        setSearchResults([])
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
                    <select name="distance_unit" onChange={handleDistanceChange}>
                        <option value="mi">mi</option>
                        <option value="km">km</option>
                    </select>
                </div>
                <div className="input-container">
                    <label>Distance: </label>
                    <input type="number" name="distance_value" value={formInput.distance_value} onChange={handleDistanceChange} />
                </div>
                <div className="input-container">
                    <label>Make: </label>
                    <input 
                        type="text" 
                        name="vehicle_make" 
                        value={formInput.vehicle.vehicle_make} 
                        onChange={handleVehicleInputChange} 
                        onClick={() => handleVehicleInputSelect(true)}
                    />
                    <div className="search-results" style={{display: searchResults.length > 0 && makeSearch ? "block" : "none"}}>
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
                    <input 
                        type="text" 
                        name="vehicle_model" 
                        value={formInput.vehicle.vehicle_model} 
                        onChange={handleVehicleInputChange} 
                        onClick={() => handleVehicleInputSelect(false)}
                    />
                    <div className="search-results" style={{display: searchResults.length > 0 && !makeSearch ? "block" : "none"}}>
                        {searchResults.length > 0 && !makeSearch && searchResults.map(result => (  
                            <div 
                                key={result} 
                                className="search-result"
                                onClick={() => handleSearchResultSelect(result)}
                            >
                                {result}
                            </div>
                        ))}
                    </div>
                </div>
                <button className="form-submit">Get Estimate</button>
            </form>
        </div>
    )
}
