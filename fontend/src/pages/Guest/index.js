import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './home'
import HomeLayout from '../../layouts/HomeLayout'
import LinkCustom from '../../components/layout/LinkCustom'
import DetailManga from './DetailManga'
import Profile from '../User/Profile'

const Guest = () => {
    const items = [
        {
            label: <LinkCustom to='/' label='Trang chủ' />,
            key: 'home'
        },
        {
            label: <LinkCustom to={'/job'} label='Mới ra mắt' />,
            key: 'job'
        },
        {
            label: <LinkCustom to={'/company'} label='Phổ biến' />,
            key: 'company'
        },
        {
            label: <LinkCustom to={'/category/'} label='Thể loại' />,
            key: 'category'
        }
    ]

    return (
        <HomeLayout menu={items}>
            <Routes>
                <Route path='/' element={<Home />} />
                {/* <Route path="/*" element={<Navigate to="/" />} /> */}
                <Route path='/detail-manga/:name' element={<DetailManga />} />
            </Routes>
        </HomeLayout>
    )
}

export default Guest
