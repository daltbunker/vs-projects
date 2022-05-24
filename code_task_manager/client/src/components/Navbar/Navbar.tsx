import { FaHouseUser, FaClipboardList, FaRegUser } from 'react-icons/fa';
import { BsFillFileBarGraphFill, BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs'
import { useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'
import { useCallback, useContext, useState } from 'react';
import { useEffect } from 'react';
import { AuthContext, IAuthContext } from '../../context/Auth';

type Props = {}

export default function Navbar({}: Props) {

    const defaultPages = ['/profile', '/tasks', '/data'];
    const navigate = useNavigate();
    const location = useLocation();
    const { authState, logout } = useContext(AuthContext) as IAuthContext;
    const loggedIn = authState.token && authState.user.username;
    const [pages, setPages] = useState(defaultPages);
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    const shortcutNav = useCallback((e: KeyboardEvent) => {
        if (e.shiftKey === true) {
            if (e.key === 'ArrowUp') { 
                navTo('up')
            }
            else if (e.key === 'ArrowDown') {
                navTo('down')
            }
          }
    }, []);

    const closeUserDropdown = useCallback((e: any) => {
        const { className } = e.target
        if (showUserDropdown && typeof(className) === 'string' && !className.includes('nav-user-dropdown')) {
            setShowUserDropdown(false);
        }
    }, [showUserDropdown]);

    useEffect(() => {
        if (loggedIn) {
            navigate(pages[1]);
            document.addEventListener('click', closeUserDropdown);
            document.addEventListener('keydown', shortcutNav);
            return () => {
                document.removeEventListener('click', closeUserDropdown);
                document.removeEventListener('keydown', shortcutNav);
            }
        }
        navigate('/');
    }, [closeUserDropdown, loggedIn, navigate, pages, shortcutNav])

    function navTo(direction: string): void {
        if (direction === 'up') {
            setPages(prevPages => {
                return [prevPages[1], prevPages[2], prevPages[0]];
            });
        } else {
            setPages(prevPages => {
                return [prevPages[2], prevPages[0], prevPages[1]];
            });
        }
    }

    function handleLogout() {
        logout();
        setShowUserDropdown(false);
        setPages(defaultPages);
    }

    return (
        <div className="navbar-container" style={{justifyContent: loggedIn ? 'space-between' : 'center'}}>
            <div className="links-container" style={{display: loggedIn ? 'block' : 'none'}}>
                <button className='nav-arrow grow' onClick={() => navTo('down')}>
                    <BsFillArrowDownCircleFill fontSize={18} />
                </button>
                {location.pathname.includes('/profile') && <FaHouseUser color='#00cf3b' fontSize={32} />}
                {location.pathname.includes('/data') && <BsFillFileBarGraphFill color='#00cf3b' fontSize={32} />}
                {location.pathname.includes('/tasks') && <FaClipboardList color='#00cf3b' fontSize={32} />}      
                <button className='nav-arrow grow' style={{position: 'relative'}} onClick={() => navTo('up')}>
                    <BsFillArrowUpCircleFill fontSize={18} />
                </button>
            </div>
            <h1>C T M</h1>
            <div className='nav-user-container' style={{display: loggedIn ? 'block' : 'none'}}>
                <FaRegUser 
                    onClick={() => setShowUserDropdown(prevState => !prevState)} 
                    style={{cursor: 'pointer'}} 
                    fontSize={27} 
                />
                <div className="nav-user-dropdown" style={{display: showUserDropdown ? 'block' : 'none'}}>
                    <div className='nav-user-dropdown-item' onClick={handleLogout}>log out</div>
                    <a 
                        className='nav-user-dropdown-item' 
                        onClick={() => setShowUserDropdown(false)} 
                        href="https://youtu.be/2Q_ZzBGPdqE" 
                        target="_blank" 
                        rel="noreferrer"
                    >
                        help?
                    </a>
                </div>
            </div>
        </div>
    )
}