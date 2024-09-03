import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, logout } from '../auth';
import './componentscss/navbar.css';

const NavBar = () => {
    const [logged] = useAuth();
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        setScrolled(window.scrollY > 50);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar navbar-expand-lg ${scrolled ? 'scrolled' : ''}`}>
            <div className="container-fluid">
                <Link
                    className="navbar-brand"
                    to="/"
                    style={{ color: scrolled ? '#000000' : '#ffffff', textDecoration: 'none' }}
                >
                    Tra-Vel
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {logged ? (
                            <>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active"
                                        to="/plane"
                                        style={{ color: scrolled ? '#000000' : '#ffffff' }}
                                    >
                                        Plane
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active"
                                        to="/train"
                                        style={{ color: scrolled ? '#000000' : '#ffffff' }}
                                    >
                                        Train
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active"
                                        to="/hotel"
                                        style={{ color: scrolled ? '#000000' : '#ffffff' }}
                                    >
                                        Hotel
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active"
                                        to="/create-travel"
                                        style={{ color: scrolled ? '#000000' : '#ffffff' }}
                                    >
                                        Create Travel
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a
                                        className="nav-link active"
                                        href="/login"
                                        onClick={logout}
                                        style={{ color: scrolled ? '#000000' : '#ffffff' }}
                                    >
                                        Logout
                                    </a>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active"
                                        to="/login"
                                        style={{ color: scrolled ? '#000000' : '#ffffff' }}
                                    >
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
