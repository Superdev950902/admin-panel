import React from "react";
import '../App.css';
import HeaderComponent from '../components/header';
import SideBarComponent from '../components/Sidebar';
import UserUI from '../components/Users';

function UserPage() {
    return (
        <div className='grid-container'>
            <HeaderComponent />
            <SideBarComponent />
            <UserUI />

        </div>
    )
}

export default UserPage;