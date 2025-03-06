import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import Layout from './Layouts/Layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Get language from localStorage or default to 'en'
        const initialLanguage = localStorage.getItem('language') || 'en';

        // Modify props to include language
   

        // Wrap the App with the Layout component to apply it globally
        root.render(
            <Layout page={props}>
            <App {...props} />
        </Layout>
        );
    },
    progress: {
        color: '#4B5563',
    },
});