import { Col, Image, Row } from 'antd'
import React from 'react'

const StoryItem = ({ manga, date1, date2 }) => {
    return (
        <Row style={{ marginTop: 20, alignItems: 'center' }}>
            <Col
                span={14}
                style={{ display: 'flex', gap: 16, alignItems: 'center' }}
            >
                <Image
                    src={manga ? manga.image : null}
                    preview={false}
                    width={45}
                    height={60}
                />
                <div>
                    <div
                        style={{
                            color: 'var(--gray)',
                            fontSize: 15,
                            fontWeight: 600
                        }}
                    >
                        {manga.name}
                    </div>
                    <div
                        style={{
                            color: 'var(--gray)',
                            fontSize: 12,
                            fontWeight: 600
                        }}
                    >
                        Chapter {manga.chap}
                    </div>
                </div>
            </Col>
            <Col span={5}>
                <div style={{ color: 'var(--gray)', fontSize: 12 }}>
                    {date1}
                </div>
            </Col>
            <Col span={5}>
                <div style={{ color: 'var(--gray)', fontSize: 12 }}>
                    {date2}
                </div>
            </Col>
        </Row>
    )
}

export default StoryItem
