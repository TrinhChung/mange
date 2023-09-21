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
    title: 'Chỉnh sửa hồ sơ',
    href: '/profile',
  },
]
const ProfileComponent = () => {
  return (
    <Row className="box-content"  >
      <TitleTopLeft title="Chỉnh sửa hồ sơ" itemList={breadcrumbData} />
    </Row>
  )
}

export default ProfileComponent