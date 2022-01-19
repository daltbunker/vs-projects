import React, {useState} from 'react'
import './Forms.css'


export default function Electricity() {

    const defaultFormInput = {
        unit: "mwh",
        value: 0,
        country: "United States",
        state: ""
    }
    const {countries, states, provinces} = require('../locationData.json')
    const [formInput, setFormInput] = useState(defaultFormInput)

    function handleInputChange(e) {
        const {name, value} = e.target
        if (value === "Canada") {
            setFormInput(prevFormInput => {
                return {
                    ...prevFormInput,
                    [name]: value,
                    state: ""
                }
            })
        } else if (value === "United States") {
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
                    [name]: value
                }
            })
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(formInput)
        if (formInput.value <= 0) {
            alert("Value must be greater than 0")
        } else if (["United States", "Canada"].includes(formInput.country) && formInput.state.length === 0) {
            alert("State is Required")
        } else {
            
        }
    }


    return (
        <div className="form-container">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-container">
                    <label>Unit: </label>
                    <select name="unit" onChange={handleInputChange}>
                        <option value="mwh">mwh</option>
                        <option value="kwh">kwh</option>
                    </select>
                </div>
                <div className="input-container">
                    <label>Value: </label>
                    <input type="number" name="value" value={formInput.value} onChange={handleInputChange} />
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
