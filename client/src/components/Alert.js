import React from 'react'
import { useMyContext } from '../context/AppContext'

const Alert = () => {
    const { alertType, alertText } = useMyContext()
    return (
        <div className={`alert ${alertType}`}>
            <p className='alert-text'>{alertText}</p>
        </div>
    )
}

export default Alert