import React from 'react'
import { Col, Row } from 'antd'
import NavigationItem from './NavigationItem'
import {
    InfoCircleOutlined,
    UserOutlined,
    KeyOutlined,
    ReadOutlined,
    LogoutOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const NavigationArea = () => {
    const navigate = useNavigate()

    return (
        <Row
            className='box-content'
            style={{ justifyContent: 'center', marginRight: 10 }}
        >
            <NavigationItem
                startIcon={<InfoCircleOutlined />}
                content='Thông tin chung'
                action={() => navigate('/profile/general')}
            />
            <NavigationItem
                startIcon={<UserOutlined />}
                content='Hồ sơ cá nhân'
                action={() => navigate('/profile/')}
            />
            <NavigationItem
                startIcon={<ReadOutlined />}
                content='Truyện đang theo dõi'
                action={() => navigate('/profile/following')}
            />
            <NavigationItem
                startIcon={<ReadOutlined />}
                content='Truyện đã đăng'
                action={() => navigate('/profile/posted')}
            />
            <NavigationItem
                startIcon={<KeyOutlined />}
                content='Đổi mật khẩu'
                action={() => {}}
            />
            <NavigationItem
                startIcon={<LogoutOutlined />}
                content='Đăng xuất'
                action={() => {}}
            />
        </Row>
    )
}

export default NavigationArea
