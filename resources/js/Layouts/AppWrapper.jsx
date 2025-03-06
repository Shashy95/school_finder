// AppWrapper.jsx
import React from 'react';
import Layout from './Layout';
import { useLanguage } from '@/Components/LanguageContext';


const AppWrapper = ({ App, props }) => {
    const { language, setLanguage } = useLanguage();

    const switchLanguage = (lang) => {
        setLanguage(lang);
    };

    return (
        <Layout language={language} switchLanguage={switchLanguage}>
            <App key={language} {...props} />
        </Layout>
    );
};

export default AppWrapper;

