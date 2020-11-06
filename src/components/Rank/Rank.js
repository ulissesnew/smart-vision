import React from 'react'
import './Rank.css';

const Rank = ({ entries }) => {
    return (
        <div className='rank'>
            <h3>Ulisses, your current rank is... </h3>
            <span>#{entries}</span>
        </div>
    )
}

export default Rank
