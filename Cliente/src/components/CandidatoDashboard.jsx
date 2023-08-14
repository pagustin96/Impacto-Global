import React from 'react'
import '../styles/candidatosDashboard.css'

export const CandidatoDashboard = ({titulo}) => {
  return (
    <div className='cand-dash-container'>
      <div className='cand-dash-box-container'>
        <h2>{titulo}</h2>
      </div>
    </div>
  )
}
