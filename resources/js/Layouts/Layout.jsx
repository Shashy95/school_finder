import React from 'react';

const Layout = ({ children, language, switchLanguage }) => {
    return (
        <div>
            {/* Language Switcher */}
            <div className="mb-4 text-center">
                <button
                    onClick={() => switchLanguage('en')}
                    className={`mr-2 ${language === 'en' ? 'font-bold' : ''}`}
                >
                    English
                </button>
                <button
                    onClick={() => switchLanguage('sw')}
                    className={`${language === 'sw' ? 'font-bold' : ''}`}
                >
                    Swahili
                </button>
            </div>

            {/* Main Content */}
            <div>{children}</div>
        </div>
    );
};

export default Layout;