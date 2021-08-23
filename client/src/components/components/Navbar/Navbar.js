import React, { useState, useEffect, useContext } from 'react';
import { Button } from '../../assets/Button/Button';
import { Link, useHistory } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [navbar, setNavbar] = useState(false);

    const [visible, setVisible] = useState(false);
    const [city, setCity] = useState("");
    const [to, setToDate] = useState("");
    const [from, setFromDate] = useState("");

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const history = useHistory();

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    useEffect(() => {
        showButton();
    }, []);


    window.addEventListener('resize', showButton);

    const changeBackground = () => {
        if (window.scrollY >= 80) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    }

    window.addEventListener('scroll', changeBackground);

    const handleChange = (e) => {
        setCity(e.target.value);
    }

    const setTo = (to) => {
        setToDate({ to });
    }

    const setFrom = (from) => {
        setFromDate({ from });
    }

    const showModal = () => {
        setVisible(true);
    };

    const hideModal = () => {
        setVisible(false);
    };

    return (
        <>
            <nav className='navbar active'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        Safar
                        &nbsp;
            <i className='fa fa-road' />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                                    <Link
                                        to='/'
                                        className='nav-links'
                                        onClick={closeMobileMenu}
                                    >
                                        Lend Your Car
                                    </Link>
                                </li>
                        
                        <li className='nav-item'>
                            <Link
                                className='nav-links'
                                onClick={() => {
                                    closeMobileMenu();
                                    showModal();
                                }}
                            >
                                Rent a Car
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                About Us
                            </Link>
                        </li>

                        <li>
                                    <Link
                                        to='/'
                                        className='nav-links-mobile'
                                        onClick={closeMobileMenu}
                                    >
                                        Log In
                                    </Link>
                                </li>
                    </ul>
                    {button && <Button buttonStyle='btn--outline' style={{ marginRight: '2.5vw' }} link="/" >LOG IN</Button>}
                </div>
            </nav>
        </>
    );
}

export default Navbar;
