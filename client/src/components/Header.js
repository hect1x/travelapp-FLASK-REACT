import React from 'react';
import './componentscss/header.css'; 

const Header = () => {
    return (
        <header className="header">
            <h1 className="header-title">Welcome to my travel app</h1>
            <p className="header-subtitle">This is just a personal project</p>
        </header>
    );
};

export default Header;
