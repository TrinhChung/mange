import { Col, Input, Row } from 'antd'
import React, { useState } from 'react'
import TitleTopLeft from '../TitleTopLeft'
import UserStory from '../UserStory'
import { useLocation } from 'react-router-dom'

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
const { Search } = Input
const PostedComponent = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const [key, setKey] = useState(
        searchParams.get('userSearchBar')
            ? searchParams.get('userSearchBar')
            : ''
    )

    console.log(key)

    return (
        <Row className='box-content'>
            <Col
                span={24}
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 10
                }}
            >
                <TitleTopLeft
                    title='Truyện đã đăng'
                    itemList={breadcrumbData}
                />
                <Search
                    placeholder='Tìm kiếm truyện'
                    allowClear
                    style={{ width: 250 }}
                    className='user-search-bar-custom'
                    size='large'
                    defaultValue={searchParams.get('userSearchBar')}
                    onChange={(e) => {
                        setKey(e.target.value)
                    }}
                />
                <div className='button-view bg-color-main'>Đăng truyện</div>
            </Col>
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
