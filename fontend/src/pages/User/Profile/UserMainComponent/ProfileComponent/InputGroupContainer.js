import { Col, Row } from 'antd'
import React from 'react'

const InputGroupContainer = ({ title, children }) => {
    return (
        <Row span={24} style={{ alignItems: 'center', margin: 16 }}>
            <span style={{ fontSize: 14, minWidth: 130 }}>{title}</span>
            <div style={{ flexGrow: 1 }}>{children}</div>
        </Row>
    )
}

export default InputGroupContainer
