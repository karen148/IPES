import React from 'react'
import PropTypes from 'prop-types'

const CounterApp = ({ values }) => {
    return (
        <div>
            <h1> {values} </h1>
        </div>
    )
}

CounterApp.propTypes = {
    values: PropTypes.number.isRequired
}

export default CounterApp
