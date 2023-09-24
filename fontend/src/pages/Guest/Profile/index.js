import { Col, Row } from 'antd'
import React from 'react'
import NavigationArea from '../../../components/profile/NavigationArea'
import { useLocation } from 'react-router-dom'
import GeneralComponent from './UserMainComponent/GeneralComponent'
import ProfileComponent from './UserMainComponent/ProfileComponent'
import FollowingComponent from './UserMainComponent/FollowingComponent'
import PostedComponent from './UserMainComponent/PostedComponent'
import AvatarArea from '../../../components/profile/AvatarArea'
import {InfoCircleOutlined, UserOutlined, KeyOutlined, ReadOutlined, LogoutOutlined} from '@ant-design/icons';

const menu = [
        {content: "Thông tin chung", path: "/profile/general", icon: <InfoCircleOutlined />},
        {content: "Hồ sơ cá nhân", path: "/profile/", icon: <UserOutlined />},
        {content: "Truyện đang theo dõi", path: "/profile/following", icon: <ReadOutlined />},
        {content: "Truyện đã đăng", path: "/profile/posted", icon: <ReadOutlined />},
        {content: "Đổi mật khẩu", path: "/profile/general", icon: <KeyOutlined />},
        {content: "Đăng xuất", path: null, icon: <LogoutOutlined />},


    ]

const Profile = () => {
    const location = useLocation()
    const pathname = location.pathname
    console.log(pathname)

    const generateComponent = (pathname) => {
        switch (pathname) {
            case '/profile/':
                return <ProfileComponent />
            case '/profile/general':
                return <GeneralComponent />
            case '/profile/following':
                return <FollowingComponent />
            case '/profile/posted':
                return <PostedComponent />
            case '/profile/change-password':
                return null
            default:
                return null
        }
    }
    return (
        <Row style={{ justifyContent: 'center', marginTop: 20 }}>
            <Col span={18}>
                <Row>
                    <Col span={8}>
                        <AvatarArea />
                        <NavigationArea menu={menu}/>
                    </Col>
                    <Col span={16}>{generateComponent(pathname)}</Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Profile
