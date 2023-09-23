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
        title: ' Truyện đang theo dõi',
        href: '/profile/following'
    }
]
const { Search } = Input
const FollowingComponent = () => {
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
                    title='Truyện đang theo dõi'
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
            </Col>
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
