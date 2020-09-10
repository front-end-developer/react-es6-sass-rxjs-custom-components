/**
 * Created by Mark Webley on 09/09/2020.
 */
import React, { useState } from 'react';
import './header.styles.scss';

const Header = ({history, screenTitle, env}) => {
    const handleGoBack = () => history.goBack();
    return (
        <div className="header">
            header
        </div>
    );
};

export default Header;

