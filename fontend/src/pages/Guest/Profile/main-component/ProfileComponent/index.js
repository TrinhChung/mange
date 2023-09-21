import { Col, Input, Row } from 'antd'
import React, { useState } from 'react'
import TitleTopLeft from '../TitleTopLeft'
import InputGroupContainer from './InputGroupContainer'

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
  const [userInfoData, setUserInfoData] = useState({
    username: "",
    fullname: "",
    email: "",
    sex: "",
    accountType: "",
    level: ""
  })

  const onChangeUserInfoData = (e) => {
    setUserInfoData({...userInfoData, [e.target.name]: e.target.value})
  }

  return (
    <Row className="box-content"  >
      <TitleTopLeft title="Chỉnh sửa hồ sơ" itemList={breadcrumbData} />
      <Col span={24} style={{ marginBottom: 16}}>
        <InputGroupContainer title={"Tên tài khoản:"}>
          <Input
            onChange={onChangeUserInfoData}
            name='username'
          />
        </InputGroupContainer>
        <InputGroupContainer title={"Họ và tên:"}>
          <Input
            onChange={onChangeUserInfoData}
            name='fullname'
          />
        </InputGroupContainer>
        <InputGroupContainer title={"Địa chỉ Email:"}>
          <Input
            onChange={onChangeUserInfoData}
            name='email'
          />
        </InputGroupContainer>
        <InputGroupContainer title={"Giới tính:"}>
          <Input
            onChange={onChangeUserInfoData}
            name='sex'
          />
        </InputGroupContainer>
        <InputGroupContainer title={"Loại tài khoản:"}>
          <Input
            onChange={onChangeUserInfoData}
            name='accountType'
          />
        </InputGroupContainer>
        <InputGroupContainer title={"Cấp bậc:"}>
          <Input
            onChange={onChangeUserInfoData}
            name='level'
          />
        </InputGroupContainer>
      </Col>
      <Col className="button-view bg-color-jade">Cập nhật</Col>
    </Row>
  )
}

export default ProfileComponent