import React from 'react'
import { Spin } from 'antd'
import HomeLayout from '../../layouts/HomeLayout'
const Loading = () => {
    return (
        <Spin tip='Loading' size='large'>
            <HomeLayout></HomeLayout>
        </Spin>
    )
}

export default Loading
