import { Row, Col } from 'antd'
import React from 'react'
import './Layout.scss'

const Title = ({ title = 'Title' }) => {
    return (
        <Row className='title_layout'>
            <Col className='wrap_title'>{title}</Col>
        </Row>
    )
}

export default Title
