import { Col, Image, Row } from 'antd'
import React from 'react'

const FollowedStory = ({manga, viewedAt, updatedAt}) => {
    return (
        <Row style={{ marginTop: 20, alignItems: "center" }}>
            <Col span={12} style={{display: 'flex', gap: 16, alignItems: "center"}}>
                <Image
                    src={manga ? manga.image : null}
                    preview={false}
                    width={45}
                    height={60}
                />
                <div>
                    <div style={{ color: "var(--gray)", fontSize: 15, fontWeight: 600}}>{manga.name}</div>
                    <div style={{ color: "var(--gray)", fontSize: 12, fontWeight: 600}}>Chapter {manga.chap}</div>
                </div>
            </Col>
            <Col span={6}>
            <div  style={{ color: "var(--gray)", fontSize: 12, textAlign: "center"}}>{viewedAt}</div>
            </Col>
            <Col span={6}>
            <div  style={{ color: "var(--gray)", fontSize: 12, textAlign: "center"}}>{updatedAt}</div>
            </Col>
        </Row>
    )
}

export default FollowedStory