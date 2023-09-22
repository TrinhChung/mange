import { Row } from 'antd'
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
        title: 'Truyện đã đăng',
        href: '/profile/posted'
    }
]
const PostedComponent = () => {
    return (
        <Row className='box-content'>
            <TitleTopLeft title='Truyện đã đăng' itemList={breadcrumbData} />
            <UserStory
                headerText={{
                    text1: 'TÊN TRUYỆN',
                    text2: 'NGÀY ĐĂNG',
                    text3: 'LƯỢT THEO DÕI'
                }}
            />
        </Row>
    )
}

export default PostedComponent
