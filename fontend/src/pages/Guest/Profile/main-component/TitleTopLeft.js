import { Breadcrumb, Col, Row } from 'antd'
import React from 'react'

const TitleTopLeft = ({title, itemList}) => {
    return (
        <Col span={24} style={{marginBottom: 20}}>
            <Row style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{title}</Row>
            <Breadcrumb
                separator=">>"
                items={itemList}
            />
        </Col>
    )
}

export default TitleTopLeft