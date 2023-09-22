import React from 'react'
import { useNavigate } from 'react-router-dom'

const LinkCustom = ({ label, to }) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(to)} style={{ fontWeight: 'bold' }}>
            {label}
        </div>
    )
}

export default LinkCustom
