import React, {createContext, useState} from 'react'

const EstimatesContext = createContext()

function EstimatesProvider(props) {

    const [allEstimates, setAllEstimates] = useState([])
    const defaultCarbonEstimate = {
        carbon_g: 0,
        carbon_lb: 0,
        carbon_kg: 0,
        carbon_mt: 0,
    }
    const [carbonEstimate, setCarbonEstimate] = useState(defaultCarbonEstimate)

    function addEstimate(estimate) {
        setCarbonEstimate(estimate)
        setAllEstimates(prevEstimates => [...prevEstimates, estimate])
    }

    function clearCarbonEstimate() {
        setCarbonEstimate(defaultCarbonEstimate)
    }

    return (
        <EstimatesContext.Provider value={{allEstimates, carbonEstimate, addEstimate, clearCarbonEstimate}}>
            {props.children}
        </EstimatesContext.Provider>  
    )
}

export {EstimatesContext, EstimatesProvider}
