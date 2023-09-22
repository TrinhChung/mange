import { Col, Row } from 'antd'
import React from 'react'
import AvatarArea from './AvatarArea'
import NavigationArea from './NavigationArea'
import { useLocation } from 'react-router-dom'
import GeneralComponent from './UserMainComponent/GeneralComponent'
import ProfileComponent from './UserMainComponent/ProfileComponent'
import FollowingComponent from './UserMainComponent/FollowingComponent'
import PostedComponent from './UserMainComponent/PostedComponent'

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
                        <NavigationArea />
                    </Col>
                    <Col span={16}>{generateComponent(pathname)}</Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Profile
