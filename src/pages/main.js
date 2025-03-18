import { useState } from 'react';
import '../App.css';
import HeaderComponent from '../components/header';
import SideBarComponent from '../components/Sidebar';
import Dashboard from '../components/Dashboard';

function MainUI() {
    return (
        <div className='grid-container'>
            <HeaderComponent />
            <SideBarComponent />
            <Dashboard />
        </div>
    )
}

export default MainUI;