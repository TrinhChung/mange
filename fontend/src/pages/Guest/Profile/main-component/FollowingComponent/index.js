import { Row } from 'antd'
import React from 'react'
import TitleTopLeft from '../TitleTopLeft'

const breadcrumbData = [
  {
    title: 'Trang chủ',
  },
  {
    title: 'User',
  },
  {
    title: ' Truyện đang theo dõi',
    href: '/profile/following',
  },
]
const FollowingComponent = () => {
  return (
    <Row className="box-content" >
      <TitleTopLeft title="Truyện đang theo dõi" itemList={breadcrumbData} />
    </Row>
  )
}

export default FollowingComponent