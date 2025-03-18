import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart } from "react-chartjs-2";
import { BsBellFill, BsCart3, BsFillGearFill, BsGrid1X2Fill, BsHouseExclamation, BsMenuButtonWideFill, BsPeopleFill, BsSubstack } from 'react-icons/bs';
import '../App.css';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [revenues, setRevenues] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {

        // axios.get("http://ec2-54-205-35-111.compute-1.amazonaws.com:5000/api/admin/users", {
        //     headers: { Authorization: `Bearer ${token}` },
        // }).then(res => setUsers(res.data));

        // axios.get("http://ec2-54-205-35-111.compute-1.amazonaws.com:5000/api/admin/revenues", {
        //     headers: { Authorization: `Bearer ${token}` },
        // }).then(res => setRevenues(res.data));
    }, []);

    return (
        <main className="main-container">
            <div className="welcome-section">
                <div className="welcome-title-section">
                    <h1 className="welcome-title">WELCOME TO JUSTENANT</h1>
                    <h1 className="welcome-text">This is admin-panel of the JUSTENANT</h1>
                </div>
                <div className="welcome-logo-section">
                    <img
                        src="/assets/icons/logo_text.png" // Replace with your logo path
                        alt="Justenant Logo"
                        style={{ height: '80px', marginRight: '10px' }}
                    />
                </div>
            </div>
            <div className="main-cards">
                <div className="card">
                    <div className="card-inner">
                        <BsPeopleFill className='card-icon' />
                        <h3 style={{ paddingBottom: '10px' }}> USER</h3>
                    </div>
                    <p className="card-description">You can manage users of the project.</p>
                    <div className="card-data">
                        <p>Total users: 200</p>
                        <p>CMTs: 10</p>
                        <p>Landlords: 80</p>
                        <p>Tenants: 70</p>
                        <p>Service Providers: 40</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <BsSubstack className='card-icon' />
                        <h3 style={{ paddingBottom: '10px' }}>PROPERTY</h3>
                    </div>
                    <div>
                        <p>You can manage Propertise of the project.</p>
                        <p>Total propery : 80</p>

                    </div>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <BsCart3 className='card-icon' />
                        <h3 style={{ paddingBottom: '10px' }}>SUBSCRIPTION</h3>

                    </div>
                    <div>
                        <p>You can manage subscription of the project.</p>
                        <p>Plan 1 is used by 10 CMTs</p>
                        <p>Plan 2 is used by 10 CMTs</p>
                        <p>Plan 3 is used by 10 CMTs</p>
                        <p>Plan 4 is used by 10 CMTs</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <BsBellFill className='card-icon' />
                        <h3 style={{ paddingBottom: '10px' }}>NOTIFICATION</h3>
                    </div>
                    <div>
                        <p>You can manage notification of the project.</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <BsMenuButtonWideFill className='card-icon' />
                        <h4 style={{ paddingBottom: '10px' }}>REPORTS</h4>

                    </div>
                    <div>
                        <p>You can manage reports of the project.</p>
                        <p>Total reports : 10</p>
                        <p>Un-read reports : 2</p>
                    </div>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <BsFillGearFill className='card-icon' />
                        <h3 style={{ paddingBottom: '10px' }}>SETTING</h3>
                    </div>
                    <div>
                        <p>You can change project setting using this</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
