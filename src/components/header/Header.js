/**
 * Created by Mark Webley on 09/09/2020.
 */
import React, { useState } from 'react';
import './header.styles.scss';

const Header = ({history, screenTitle, env}) => {
    const handleGoBack = () => history.goBack();
    return (
        <div className="mw-header">
            { history && <span className="">
                <p className="link" onClick={handleGoBack}> &lt;&lt; Back </p>
                </span>
            }
            { screenTitle && <span className="">{screenTitle}</span> }
            { env && <span className="">{env}</span> }
        </div>
    );
};

export default Header;

