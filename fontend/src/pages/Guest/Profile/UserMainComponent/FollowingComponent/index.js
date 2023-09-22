import { Col, Row } from 'antd'
import React from 'react'
import TitleTopLeft from '../TitleTopLeft'
import UserStory from '../UserStory'

const breadcrumbData = [
    {
        title: 'Trang chủ'
    },
    {
        title: 'User'
    },
    {
        title: ' Truyện đang theo dõi',
        href: '/profile/following'
    }
]
const FollowingComponent = () => {
    return (
        <Row className='box-content'>
            <TitleTopLeft
                title='Truyện đang theo dõi'
                itemList={breadcrumbData}
            />
            <UserStory
                headerText={{
                    text1: 'TÊN TRUYỆN',
                    text2: 'XEM GẦN NHẤT',
                    text3: 'NGÀY CẬP NHẬT'
                }}
            />
        </Row>
    )
}

export default FollowingComponent
