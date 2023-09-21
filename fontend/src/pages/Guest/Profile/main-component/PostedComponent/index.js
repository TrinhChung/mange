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
    title: 'Truyện đã đăng',
    href: '/profile/posted',
  },
]
const PostedComponent = () => {
  return (
    <Row className="box-content"  >
      <TitleTopLeft title="Truyện đã đăng" itemList={breadcrumbData} />
    </Row>
  )
}

export default PostedComponent