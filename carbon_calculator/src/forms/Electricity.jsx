import React, {useState} from 'react'
import './Forms.css'


export default function Electricity() {

    const defaultFormInput = {
        unit: "",
        value: "",
        country: "",
        state: ""
    }
    const {countries, states, provinces} = require('../locationData.json')
    const [formInput, setFormInput] = useState(defaultFormInput)

    function handleInputChange(e) {
        const {name, value} = e.target
        setFormInput(prevFormInput => {
            return {
                ...prevFormInput,
                [name]: value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(formInput)
        setFormInput(defaultFormInput)
    }


    return (
        <div className="form-container">
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="input-container">
                    <label>Unit: </label>
                    <select name="unit" onChange={handleInputChange}>
                        <option value=""></option>
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
                        <option value=""></option>
                        {Object.keys(countries).map(country => <option key={country} value={country}>{country}</option>)}
                    </select>
                </div>
                <div className="input-container" style={{display: formInput.country === "United States" ? "block" : "none"}}>
                    <label>State: </label>
                    <select name="state" onChange={handleInputChange}>
                        <option value=""></option>
                        {states.map(state => <option key={state} value={state}>{state}</option>)}
                    </select>
                </div>
                <div className="input-container" style={{display: formInput.country === "Canada" ? "block" : "none"}}>
                    <label>Provinces: </label>
                    <select name="state">
                        <option value=""></option>
                        {provinces.map(province => <option key={province} value="">{province}</option>)}
                    </select>
                </div>
                <button className="form-submit">Get Estimate</button>
            </form>
        </div>
    )
}
