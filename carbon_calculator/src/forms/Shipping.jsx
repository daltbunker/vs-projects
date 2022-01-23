import React, {useState} from 'react'

export default function Shipping() {

    const defaultFormInput = {
        type: "vehicle",
        weight_unit: "",
        weight_value: "",
        distance_unit: "mi",
        distance_value: 100,
        transport_method: ""
      }
    const [formInput, setFormInput] = useState(defaultFormInput)

    function handleChange(e) {

    }

    function handleSubmit(e) {

    }
    return (
        <div className="form-container">
            <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
            <div className="input-container">
                <label>Unit (weight): </label>
                <select name="weight_unit" onChange={(e) => handleChange(e)}>
                    <option value="g">g</option>
                    <option value="lb">lb</option>
                    <option value="kg">kg</option>
                    <option value="mt">mt</option>
                </select>
            </div>
            <div className="input-container">
                <label>Weight: </label>
                <input type="number" name="weight_value" value={formInput.weight_value} onChange={(e) => handleChange(e)} />
            </div>
            <div className="input-container">
                <label>Unit (distance): </label>
                <select name="distance_unit" onChange={(e) => handleChange(e)}>
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
                <select name="distance_unit" onChange={(e) => handleChange(e)}>
                    <option value="mi">mi</option>
                    <option value="km">km</option>
                </select>
            </div>
                <button className="form-submit">Get Estimate</button>
            </form>
        </div>
    )
}
