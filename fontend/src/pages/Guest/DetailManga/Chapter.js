import React from 'react'
import { Col, Row } from 'antd'
import TitleChildren from '../../../components/layout/TitleChildren'
import { UnorderedListOutlined } from '@ant-design/icons'

const Chapter = ({ chapters = [] }) => {
    const RowChapter = ({ chapter, date }) => {
        return (
            <Row
                style={{
                    justifyContent: 'space-between',
                    fontSize: 16,
                    height: 30
                }}
            >
                <Col style={{ fontSize: 16 }}>{chapter}</Col>
                <Col style={{ fontSize: 16 }}>{date}</Col>
            </Row>
        )
    }

    return (
        <Row className='box-content' style={{ marginRight: 20 }}>
            <Col span={24}>
                <Row>
                    <TitleChildren
                        children={<UnorderedListOutlined />}
                        title='Danh sách chương truyện'
                    />
                </Row>
                <Row
                    style={{
                        color: 'var(--gray)',
                        fontSize: 16,
                        justifyContent: 'center'
                    }}
                >
                    <Col span={22}>
                        <Row style={{ paddingBottom: 20 }}></Row>
                        <RowChapter
                            chapter={
                                <Col
                                    style={{
                                        fontWeight: 'bold',
                                        color: 'black',
                                        fontSize: 16,
                                        paddingLeft: 10
                                    }}
                                >
                                    Chapter
                                </Col>
                            }
                            date={
                                <Col
                                    style={{
                                        fontWeight: 'bold',
                                        color: 'black',
                                        fontSize: 16,
                                        paddingRight: 10
                                    }}
                                >
                                    Ngày cập nhật
                                </Col>
                            }
                        />
                        <Row
                            style={{
                                border: '2px solid var(--gray)',
                                padding: '10px 10px',
                                borderRadius: 8
                            }}
                        >
                            <Col span={24}>
                                {chapters &&
                                    chapters.length > 0 &&
                                    chapters.map((chapter) => {
                                        return (
                                            <RowChapter
                                                chapter={
                                                    'Chapter ' + chapter.chapter
                                                }
                                                date={chapter.updateDay}
                                            />
                                        )
                                    })}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Chapter
