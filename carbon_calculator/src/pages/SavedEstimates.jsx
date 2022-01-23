import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import { EstimatesContext } from '../components/EstimatesContext'
import EstimateCard from '../components/EstimateCard'
import './SavedEstimates.css'

export default function SavedEstimates() {

    const {allEstimates} = useContext(EstimatesContext)
    return (
        <div className="SavedEstimates">
            <Link className="calculator-link" to="/">Carbon Calculator</Link>
            <div className="estimates-title">All Estimates</div>
            <div className="estimates">
                {allEstimates.map(estimate => {
                    return (
                        <EstimateCard key={estimate.carbon_g} data={estimate} />
                    )
                })}
            </div>
        </div>
    )
}
