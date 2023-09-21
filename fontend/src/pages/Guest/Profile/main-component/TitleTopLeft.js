import { Breadcrumb, Col, Row } from 'antd'
import React from 'react'

const TitleTopLeft = ({title, itemList}) => {
    return (
        <Row style={{ flexDirection: "column" }}>
            <Col style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{title}</Col>
            <Breadcrumb
                separator=">>"
                items={itemList}
            />
        </Row>
    )
}

export default TitleTopLeft