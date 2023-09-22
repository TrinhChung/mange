import { Row, Col } from 'antd'
import React from 'react'
import './Layout.scss'

const TitleChildren = ({ children, title = 'Title' }) => {
    return (
        <Row className='title-children'>
            <Col style={{ paddingRight: 4, fontSize: 20 }}>{children}</Col>
            <Col style={{ fontSize: 20 }}>{title}</Col>
        </Row>
    )
}

export default TitleChildren
