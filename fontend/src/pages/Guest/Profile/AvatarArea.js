import { Avatar, Col, Row } from 'antd'
import React from 'react'

const AvatarArea = () => {
    return (
        <Row
            className='box-content'
            style={{ justifyContent: 'center', marginRight: 10 }}
        >
            <Col>
                <Row style={{ color: 'var(--gray)', justifyContent: 'center' }}>
                    <Avatar
                        src='https://i.pinimg.com/736x/ca/b3/fc/cab3fcec1daf3fa996e846efb130ecda.jpg'
                        size={180}
                    />
                </Row>
                <Row
                    style={{
                        color: 'var(--gray)',
                        marginBottom: 20,
                        marginTop: 28,
                        justifyContent: 'center'
                    }}
                    className='title-children'
                >
                    <Col style={{ fontSize: 32 }}>Zhong Xina</Col>
                </Row>
                <Row
                    style={{ color: 'var(--gray)', justifyContent: 'center' }}
                    className='title-children'
                >
                    <Col style={{ fontSize: 16 }} className='color-jade'>
                        ĐỘC GIẢ
                    </Col>
                </Row>
                <Row
                    style={{ color: 'var(--gray)', justifyContent: 'center' }}
                    className='title-children'
                >
                    <Col style={{ fontSize: 16 }} className='color-main'>
                        VIP 10
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default AvatarArea
