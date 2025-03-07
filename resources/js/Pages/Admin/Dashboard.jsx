import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useLanguage } from '@/Components/LanguageContext';
import { Head, useForm } from '@inertiajs/react';

const AdminDashboard = () => {
    const { translate } = useLanguage();

    return (
        <AdminLayout>
            <div className="bg-white p-6 rounded-lg shadow">
            <Head title={translate('dashboard')} />
                <h2 className="text-2xl font-bold mb-4">{translate('dashboard')}</h2>
                <p>{translate('welcomeMessage')}</p>
                {/* Add metrics, charts, or other content here */}
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;