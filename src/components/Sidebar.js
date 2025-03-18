import react from 'react';
import { Link, Links, useLocation } from 'react-router-dom';
import { BsBell, BsCart3, BsFillGearFill, BsGrid1X2, BsHouseExclamation, BsMenuButtonWideFill, BsPeople, BsPerson, BsSubstack, BsPersonBadgeFill} from 'react-icons/bs';
import '../assets/css/SideMenu.css';

function SideBarComponent() {
    const location = useLocation();
    return (
        <aside id='sidebar'>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <img
                        src="/assets/icons/logo_blue.png" // Replace with your logo path
                        alt="Justenant Logo"
                        style={{ height: '60px' }}
                    />
                </div>
            </div>
            <ul className='sidebar-list'>
                <li className={location.pathname==='/'?'sidebar-list-item active':'sidebar-list-item'}>
                    <Link to="/">
                        <div>
                            <BsGrid1X2 className='icon' />
                            <button className='menu-button'>DASHBOARD</button>
                        </div>
                    </Link>
                </li>
                <li className={location.pathname==='/users'?'sidebar-list-item active':'sidebar-list-item'}>
                    <Link to="/users">
                        <div>
                            <BsPeople className='icon' />
                            <button className='menu-button'>USER</button>
                        </div>
                    </Link>
                </li>
                <li className={location.pathname==='/about'?'sidebar-list-item active':'sidebar-list-item '}>
                    <Link to="/">
                        <div>
                            <BsPersonBadgeFill className='icon' />
                            <button className='menu-button'>CMT</button>
                        </div>
                    </Link>
                </li>
                <li className={location.pathname==='/property'?'sidebar-list-item active':'sidebar-list-item '}>
                    <Link to="/">
                        <div>
                            <BsSubstack className='icon' />
                            <button className='menu-button'>PROPERTY</button>
                        </div>
                    </Link>
                </li>
                <li className={location.pathname==='/subscription'?'sidebar-list-item active':'sidebar-list-item '}>
                    <Link to="/">
                        <div>
                            <BsCart3 className='icon' />
                            <button className='menu-button'>SUBSCRIPTION</button>
                        </div>
                    </Link>
                </li>
                <li className={location.pathname==='/notification'?'sidebar-list-item active':'sidebar-list-item '}>
                    <Link to="/">
                        <div>
                            <BsBell className='icon' />
                            <button className='menu-button'>NOTIFICATION</button>
                        </div>
                    </Link>
                </li>
                <li className={location.pathname==='/report'?'sidebar-list-item active':'sidebar-list-item '}>
                    <Link to="/">
                        <div>
                            <BsMenuButtonWideFill className='icon' />
                            <button className='menu-button'>REPORT</button>
                        </div>
                    </Link>
                </li>
                <li className={location.pathname==='/profile'?'sidebar-list-item active':'sidebar-list-item '}>
                    <Link to="/">
                        <div>
                            <BsPerson className='icon' />
                            <button className='menu-button'>PROFILE</button>
                        </div>
                    </Link>
                </li>
                
            </ul>
        </aside>
    )
}
export default SideBarComponent;