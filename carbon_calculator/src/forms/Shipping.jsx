import axios from 'axios'
import React, {useState, useContext} from 'react'
import config from '../config'
import { EstimatesContext } from '../components/EstimatesContext'

export default function Shipping() {

    const defaultFormInput = {
        type: "shipping",
        weight_unit: "g",
        weight_value: 20,
        distance_unit: "mi",
        distance_value: 100,
        transport_method: "ship"
      }
    const [formInput, setFormInput] = useState(defaultFormInput)
    const [loading, setLoading] = useState(false)
    const {addEstimate} = useContext(EstimatesContext)

    function handleChange(e) {
        let {name, value} = e.target
        if (/value/.test(name)){
            value = value === "" ? 0 : parseFloat(value)   
        }

        setFormInput(prevFormInput => {
            return {
                ...prevFormInput,
                [name]: value
            }
        })

    }

    function validateInput() {
        if (formInput.weight_value > 0 && formInput.distance_value > 0) {
            return true
        }
        alert("All values must be greater than 0")
        return false
    }

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        if (validateInput()) {
            axios
                .post("https://www.carboninterface.com/api/v1/estimates", formInput, config)
                .then(resp => {
                    const carbonEstimateObj = resp.data.data.attributes
                    addEstimate({type: "shipping", ...carbonEstimateObj})
                    setLoading(false)
                })
                .catch(() => alert("Sorry, we couldn't complete your request. Please try again."))
        }

    }
    return (
        <div className="form-container">
            <div className="loader" style={{display: loading ? "block" : "none"}}>loading.</div>
            <form onSubmit={(e) => handleSubmit(e)} style={{opacity: loading ? "50%" : "100%"}}>
                <div className="input-container">
                    <label>Unit (weight): </label>
                    <select name="weight_unit" value={formInput.weight_unit} onChange={(e) => handleChange(e)}>
                        <option value="g">g (grams)</option>
                        <option value="lb">lb (pounds)</option>
                        <option value="kg">kg (kilograms)</option>
                        <option value="mt">mt (tonnes)</option>
                    </select>
                </div>
                <div className="input-container">
                    <label>Weight: </label>
                    <input type="number" name="weight_value" value={formInput.weight_value} onChange={(e) => handleChange(e)} />
                </div>
                <div className="input-container">
                    <label>Unit (distance): </label>
                    <select name="distance_unit" value={formInput.distance_unit} onChange={(e) => handleChange(e)}>
                        <option value="mi">mi</option>
                        <option value="km">km</option>
                    </select>
                </div>
                <div className="input-container">
                    <label>Distance: </label>
                    <input type="number" name="distance_value" value={formInput.distance_value} onChange={(e) => handleChange(e)} />
                </div>
                <div className="input-container">
                    <label>Transport Method: </label>
                    <select name="transport_method" value={formInput.transport_method} onChange={(e) => handleChange(e)}>
                        <option value="ship">Ship</option>
                        <option value="train">Train</option>
                        <option value="truck">Truck</option>
                        <option value="plane">Plane</option>
                    </select>
                </div>
                <button className="form-submit">Get Estimate</button>
            </form>
        </div>
    )
}
