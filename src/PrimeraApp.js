import React, { Fragment } from 'react';
import PropTypes from 'prop-types'

const PrimeraApp = ({ saludo, subtitulo }) =>{


    return(
        <>
            <h1>{saludo}</h1>
            <h1>{subtitulo}</h1>
        </>
    )

}

PrimeraApp.propTypes = {
    saludo: PropTypes.string.isRequired
}

PrimeraApp.defaultProps = {
    subtitulo: 'Buenas'
}

export default PrimeraApp;