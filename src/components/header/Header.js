import React from 'react';

import Logo from './logo/Logo';
import Navigation from './navigation/Navigation';
import FiltersBar from './filtersbar/FiltersBar';

import './Header.css';

const Header = () => {
    return(
        <div>
            <div className="upcontainer">
                <Logo />
                <Navigation />
            </div>
            <FiltersBar />
        </div>
    )
}

export default Header;