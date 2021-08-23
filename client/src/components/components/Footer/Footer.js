import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <div className='footer-container'>
            <div className='footer-links'>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>About Us</h2>
                        <Link to='/'>How it works</Link>
                        <Link to='/'>Terms of Service</Link>
                    </div>
                </div>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>Explore</h2>
                        <Link to='/'>Book a Car</Link>
                        <Link to='/'>Rent out car</Link>
                        <Link to='/'>Trust & Safety</Link>
                        <Link to='/'>FAQs</Link>
                    </div>
                    <div className='footer-link-items'>
                        <h2>Contact Us</h2>
                        <Link to='/'>Contact</Link>
                        <Link to='/'>Support</Link>
                        <Link to='/'>Destinations</Link>
                        <Link to='/'>Sponsorships</Link>
                    </div>
                </div>
            </div>
            <section className='social-media'>
                <div className='social-media-wrap'>
                    <div className='footer-logo'>
                        <Link to='/' className='social-logo'>
                            Safar
                            &nbsp;
                        <i className='fa fa-road' />
                        </Link>
                    </div>
                    <small className='website-rights'>Safar © 2021</small>
                    <div>
                        <Link
                            to='/'
                            target='_blank'
                            style={{color:"white"}}
                        >
                            Privacy
                        </Link>
                        &nbsp; &nbsp;
                        <Link
                            to='/'
                            target='_blank'
                            style={{ color: "white" }}
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default React.memo(Footer);
