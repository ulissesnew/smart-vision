import React from 'react'
import './Rank.css';

const Rank = ({ entries,name }) => {
    return (
        <div className='rank'>
            <h3>{name}, your current rank is... </h3>
            <span>#{entries}</span>
        </div>
    )
}

export default Rank
