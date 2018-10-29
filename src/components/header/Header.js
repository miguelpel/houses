import React from 'react';

import Logo from './logo/Logo';
import Navigation from './navigation/Navigation';

import './Header.css';

const Header = () => {
    return(
            <div className="upcontainer">
                <Logo />
                <Navigation />
            </div>
    )
}

export default Header;