import React from 'react';
import Navbar from '../shared/Navbar';
import Banner from './Banner';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/Footer';
import TopBar from './TobBar';

const Root = () => {
    return (

        <div >
            <TopBar></TopBar>
            <div className='max-w-7xl mx-auto'>
                <Navbar></Navbar>
                <Banner></Banner>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>

        </div>
    );
};

export default Root;