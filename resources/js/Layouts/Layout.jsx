import React from 'react';
import { router } from '@inertiajs/react';

const Layout = ({ children, page }) => {
    // Get language from page props
    const language = page?.props?.language || 'en';

    // Function to switch language
    const switchLanguage = (lang) => {
        router.post('/set-language', { language: lang }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

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

            {/* Render children */}
            {children}
        </div>
    );
};

export default Layout;