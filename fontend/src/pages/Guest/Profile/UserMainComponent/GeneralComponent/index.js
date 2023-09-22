import { Col, Row } from 'antd'
import React from 'react'
import TitleTopLeft from '../TitleTopLeft'

const breadcrumbData = [
    {
        title: 'Trang chủ'
    },
    {
        title: 'User'
    },
    {
        title: 'Thông tin chung',
        href: '/profile/general'
    }
]
const GeneralComponent = () => {
    return (
        <Row className='box-content'>
            <TitleTopLeft title='Thông tin chung' itemList={breadcrumbData} />
        </Row>
    )
}

export default GeneralComponent
