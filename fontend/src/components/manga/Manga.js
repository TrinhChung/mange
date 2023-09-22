import { Col, Image, Row } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Manga = ({ manga = {} }) => {
    const navigate = useNavigate()

    return (
        <Col>
            <Row>
                <Image
                    src={manga ? manga.image : null}
                    preview={false}
                    width={150}
                    height={200}
                />
            </Row>
            <Row style={{ paddingTop: 8, fontWeight: 'bold', fontSize: 20 }}>
                #{manga ? manga.chapter : '100'}
            </Row>
            <Row
                style={{
                    paddingTop: 4,
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: 'var(--gray)',
                    cursor: 'pointer'
                }}
                onClick={() => {
                    if (!manga || !manga.slug) {
                        navigate('/')
                    } else navigate(`/detail-manga/${manga.slug}`)
                }}
            >
                {manga ? manga.name : 'Name'}
            </Row>
        </Col>
    )
}

export default Manga
