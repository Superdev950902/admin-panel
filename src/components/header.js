import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom';
import {BsFillBellFill, BsFillEnvelopeFill, BsJustify, BsPersonCircle} from 'react-icons/bs';

function HeaderComponent() {
    const location = useLocation();
    // const navigate = useNavigate();
    const userSession = localStorage.getItem('user');
    const user = JSON.parse(userSession);

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.reload();
    }

    return (
       <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon icon-header'/>
        </div>
        <div className='header-right'>
            <BsFillBellFill className='icon'/>
            <BsFillEnvelopeFill className='icon'/>
            <BsPersonCircle className='icon'/>
        </div>
       </header>
    );
}

export default HeaderComponent;