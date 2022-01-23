import React, {useState, useContext} from 'react'
import './Forms.css'
import axios from 'axios'
import config from '../config'
import { EstimatesContext } from '../components/EstimatesContext'


export default function Electricity() {

    const defaultFormInput = {
        type: "electricity",
        electricity_unit: "mwh",
        electricity_value: 100,
        country: "United States",
        state: "",
    }
    const {countries, states, provinces} = require('../locationData.json')
    const [formInput, setFormInput] = useState(defaultFormInput)
    const {addEstimate} = useContext(EstimatesContext)

    function handleInputChange(e) {
        const {name, value} = e.target
        let num = 0

        if (name === "electricity_value" && value !== "") {
            num = parseFloat(value)
        }
        if (name === "country") {
            setFormInput(prevFormInput => {
                return {
                    ...prevFormInput,
                    [name]: value,
                    state: ""
                }
            })
        } else {
            setFormInput(prevFormInput => {
                return {
                    ...prevFormInput,
                    [name]: name === "electricity_value" ? num : value
                }
            })
        }
}

    function handleSubmit(e) {
        e.preventDefault()
        if (validateInput()) {
            const data = {
                ...formInput,
                country: countries[formInput.country]
            }
            axios
                .post("https://www.carboninterface.com/api/v1/estimates", data, config)
                .then(resp => {
                    const carbonEstimateObj = resp.data.data.attributes
                    addEstimate({type: "electricity", ...carbonEstimateObj})
                })
        }
    }

    function validateInput() {
        if (formInput.electricity_value <= 0) {
            alert("Value must be greater than 0")
            return false
        } else if (["United States", "Canada"].includes(formInput.country) && formInput.state.length === 0) {
            alert("State is Required")
            return false
        }
        return true
    }


    return (
        <div className="form-container">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-container">
                    <label>Unit: </label>
                    <select name="electricity_unit" onChange={handleInputChange}>
                        <option value="mwh">mwh</option>
                        <option value="kwh">kwh</option>
                    </select>
                </div>
                <div className="input-container">
                    <label>Value: </label>
                    <input type="number" name="electricity_value" value={formInput.electricity_value} onChange={handleInputChange} />
                </div>
                <div className="input-container">
                    <label>Country: </label>
                    <select name="country" onChange={handleInputChange}>
                        {Object.keys(countries).map(country => <option key={country} value={country}>{country}</option>)}
                    </select>
                </div>
                <div className="input-container" style={{display: formInput.country === "United States" ? "block" : "none"}}>
                    <label>State: </label>
                    <select name="state" onChange={handleInputChange} value={formInput.state}>
                        <option value=""></option>
                        {states.map(state => <option key={state} value={state}>{state}</option>)}
                    </select>
                </div>
                <div className="input-container" style={{display: formInput.country === "Canada" ? "block" : "none"}}>
                    <label>Provinces: </label>
                    <select name="state" onChange={handleInputChange} value={formInput.state}>
                        <option value=""></option>
                        {provinces.map(province => <option key={province} value={province}>{province}</option>)}
                    </select>
                </div>
                <button className="form-submit">Get Estimate</button>
            </form>
        </div>
    )
}
