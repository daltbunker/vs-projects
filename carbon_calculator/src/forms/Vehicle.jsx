import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import './Forms.css'
import config from '../config'
import { EstimatesContext } from '../components/EstimatesContext'

function Vehicle() {

    const defaultFormInput = {
        type: "vehicle",
        distance_unit: "mi",
        distance_value: 100,
        vehicle_make: "",
        vehicle_model: "",
        vehicle_year: ""
    }
    const defaultVehicle = {
        makes: [],
        models: [],
        years: []
    }
    const [formInput, setFormInput] = useState(defaultFormInput)
    const [vehicle, setVehicle] = useState(defaultVehicle)
    const [searchResults, setSearchResults] = useState([])
    const [selectedInput, setSelectedInput] = useState("")
    const {addEstimate} = useContext(EstimatesContext)

    useEffect(() => {
        axios
            .get("https://www.carboninterface.com/api/v1/vehicle_makes", config)
            .then(resp => {
                const allMakes = resp.data.map(make => ({name: make.data.attributes.name, id: make.data.id}))
                setVehicle({makes: [...allMakes], models: [], years: []})
            })
    }, [])

    function handleInputChange(e) {
        let {name, value} = e.target
        if (/value/.test(name)) {
            value = value === "" ? 0 : parseFloat(value)   
        }
        if (/vehicle/.test(name)) {
            value = value.length > 0 ? value[0].toUpperCase() + value.slice(1,) : ""
        }

        setFormInput(prevFormInput => {
            return {
                ...prevFormInput,
                [name]: value
            }
        })
    }

    function filterSearchResults(e) {
        const {name, value} = e.target
        if (value.length > 0) {
            let results
            const searchParam = new RegExp(value)
            switch(name) {
                case "vehicle_make":
                    results = vehicle.makes.filter(make => searchParam.test(make.name))
                    break
                case "vehicle_model":
                    const uniqueModels = [...new Set(vehicle.models.map(model => model.name))]
                    results = uniqueModels.filter(model => searchParam.test(model))
                    break
                default:
                    break
            }
            setSearchResults(results)
        }
    }

    function getModels(id) {
        axios
            .get(`https://www.carboninterface.com/api/v1/vehicle_makes/${id}/vehicle_models`, config)
            .then(resp => {
                const allModels = resp.data.map(model => ({ name: model.data.attributes.name, year: model.data.attributes.year, id: model.data.id }))
                setVehicle(prevVehicle => {
                    return {
                        ...prevVehicle,
                        models: [...allModels]
                    }
                })
            })
    }

    function getYears(name) {
        const modelYears = []
        const allYears = vehicle.models.filter(model => {
            if (model.name === name && !modelYears.includes(model.year)) {
                modelYears.push(model.year)
                return model.year
            }
            return null
        })

        setVehicle(prevVehicle => {
            return {
                ...prevVehicle,
                years: [...allYears.sort((a, b) => a.year - b.year)]
            }
        })
    }

    function handleSearchResultSelect(value, name) {
        setSearchResults([])
        setFormInput(prevFormInput => {
            return {
                ...prevFormInput,
                [name]: value
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
                <select name="distance_unit" onChange={(e) => handleInputChange(e)}>
                    <option value="mi">mi</option>
                    <option value="km">km</option>
                </select>
            </div>
            <div className="input-container">
                <label>Distance: </label>
                <input type="number" name="distance_value" value={formInput.distance_value} onChange={(e) => handleInputChange(e)} />
            </div>
            <div className="input-container">
                <label>Make: </label>
                <input 
                    type="text" 
                    name="vehicle_make" 
                    value={formInput.vehicle_make} 
                    onChange={(e) => {
                        handleInputChange(e)
                        filterSearchResults(e)
                    }} 
                    onClick={() => setSelectedInput("vehicle_make")}
                />
                <div 
                    className="search-results" 
                    style={{display: searchResults.length > 0 && selectedInput === "vehicle_make" ? "block" : "none"}}
                >
                    {selectedInput === "vehicle_make" && searchResults.map(result => (  
                        <div 
                            key={result.id} 
                            className="search-result"
                            onClick={() => {
                                handleSearchResultSelect(result.name, "vehicle_make")
                                getModels(result.id)
                            }}
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
                    value={formInput.vehicle_model} 
                    onChange={(e) => {
                        handleInputChange(e)
                        filterSearchResults(e)
                    }}
                    onClick={() => setSelectedInput("vehicle_model")}
                    disabled={vehicle.models.length > 0 ? false : true}
                />
                <div 
                    className="search-results" 
                    style={{display: searchResults.length > 0  && selectedInput === "vehicle_model" ? "block" : "none"}}
                >
                    {selectedInput === "vehicle_model" && searchResults.map(name => (  
                        <div 
                            key={name} 
                            className="search-result"
                            onClick={() => {
                                handleSearchResultSelect(name, "vehicle_model")
                                getYears(name)
                                setSelectedInput("vehicle_year")
                            }}
                        >
                            {name}
                        </div>
                    ))}
                </div>
            </div>
            <div className="input-container">
                <label>Year: </label>
                <select 
                    name="vehicle_year" 
                    value={formInput.vehicle_year}
                    onChange={(e) => {
                        handleInputChange(e)
                    }}
                    disabled={vehicle.years.length > 0 ? false : true}
                >
                    {selectedInput === "vehicle_year" && vehicle.years.map((make, i) => {
                        return <option key={i} value={make.year}>{make.year}</option>
                    })}
                </select>
            </div>
            <button className="form-submit">Get Estimate</button>
            </form>
        </div>
    )
}

export default Vehicle