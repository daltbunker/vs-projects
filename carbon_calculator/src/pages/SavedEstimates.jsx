import React, {useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { EstimatesContext } from '../components/EstimatesContext'
import EstimateCard from '../components/EstimateCard'
import './SavedEstimates.css'

export default function SavedEstimates() {

    const {allEstimates} = useContext(EstimatesContext)
    const navigate = useNavigate()

    return (
        <div className="SavedEstimates">
            <Link className="calculator-link" to="/">Carbon Calculator</Link>
            <div className="estimates-title">All Estimates</div>
            <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
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
