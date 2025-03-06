import React, { createContext, useState, useContext,useEffect } from 'react';
import translations from '../translations.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        const storedLanguage = localStorage.getItem('language');

        return storedLanguage || 'en';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

     // Function to get translated text
     const translate = (key) => {
        return translations[language][key] || key; // Fallback to the key if translation is missing
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, translate  }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);