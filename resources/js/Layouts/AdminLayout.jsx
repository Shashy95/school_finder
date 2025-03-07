import React from 'react';
import { Link } from '@inertiajs/react';
import { useLanguage } from '@/Components/LanguageContext'; // Adjust the path as needed

const AdminLayout = ({ children }) => {
    const { language, translate } = useLanguage();

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-blue-800 text-white p-4">
                <h2 className="text-xl font-bold mb-6">{translate('adminPanel')}</h2>
                <nav>
                    <Link href="/admin/dashboard" className="block py-2 hover:bg-blue-700 rounded">
                        {translate('dashboard')}
                    </Link>
                    <Link href="/admin/schools" className="block py-2 hover:bg-blue-700 rounded">
                        {translate('schools')}
                    </Link>
                    {/*
                    <Link href="/admin/users" className="block py-2 hover:bg-blue-700 rounded">
                        {translate('users')}
                    </Link>
*/}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <header className="bg-white shadow mb-6 p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">{translate('dashboard')}</h1>
                        <Link href="/logout" method="post" as="button" className="text-red-500 hover:underline">
                            {translate('logout')}
                        </Link>
                    </div>
                </header>
                <main>{children}</main>
            </div>
        </div>
    );
};

export default AdminLayout;