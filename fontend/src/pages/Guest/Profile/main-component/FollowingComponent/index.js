import { Col, Row } from 'antd'
import React from 'react'
import TitleTopLeft from '../TitleTopLeft'
import FollowedStory from './followed-story'

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
      <Col span={24}>
        <Row style={{ marginTop: 20 }}>
          <Col span={12}>
            <div className='color-main' style={{fontSize: 14, fontWeight: 600}} >TÊN TRUYỆN</div>
          </Col>
          <Col span={6}>
            <div className='color-main' style={{fontSize: 14, fontWeight: 600}}>XEM GẦN NHẤT</div>
          </Col>
          <Col span={6}>
            <div className='color-main' style={{fontSize: 14, fontWeight: 600}}>NGÀY CẬP NHẬT</div>
          </Col>
        </Row>
        {
          [6,76,3,4,12, 94, 10, 123].map((item, index) => <FollowedStory manga={{image: 'https://i.pinimg.com/564x/67/b6/90/67b690140f09b858dd942c7a35e434e2.jpg', name: "Attack On Titan", chap: 100 +  item}} viewedAt={"16 phút trước"} updatedAt={"13 phút trước"}></FollowedStory>)
        }
        
      </Col>
    </Row>
  )
}

export default FollowingComponent