import { Row, Col } from 'antd'
import React from 'react'

const RowInfo = ({ children = null, content, action = null }) => {
    return (
        <Row style={{ color: 'var(--gray)', height: 30, fontSize: 16 }}>
            <Col style={{ minWidth: 110 }}>{children}</Col>
            <Col onClick={action} style={{ cursor: action ? 'pointer' : null }}>
                {content}
            </Col>
        </Row>
    )
}

export default RowInfo
