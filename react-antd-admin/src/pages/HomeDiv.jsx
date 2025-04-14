import { Outlet } from 'react-router-dom';
import SlideMenu from '../layout/slide/index';
import Header from '../layout/header/index';
import React from 'react';


export default function HomeDiv() {
    return (
        <div className='app'>
            <div className='app-slide'>
                <SlideMenu />
            </div>
            <div className='app-content'>
                <Header/>
                <Outlet />
            </div>
        </div>
    );
}
