import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { useLanguage } from '@/Components/LanguageContext';
import { Menu, X, Home, School, LogOut } from 'lucide-react';

const AdminLayout = ({ children, title }) => {
    const { translate } = useLanguage();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { name: translate('dashboard'), href: '/admin/dashboard', icon: <Home size={18} /> },
        { name: translate('schools'), href: '/admin/schools', icon: <School size={18} /> },
        // Add more nav items as needed
    ];

    return (
        <div className="min-h-screen flex">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div 
                className={`fixed top-0 left-0 h-full bg-indigo-900 text-white w-64 transition-transform duration-300 ease-in-out z-30 transform ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 lg:static lg:z-10 flex flex-col`}
            >
                <div className="flex items-center justify-between p-4 border-b border-indigo-800">
                    <h2 className="text-xl font-bold">{translate('adminPanel')}</h2>
                    <button 
                        className="lg:hidden text-white"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={24} />
                    </button>
                </div>
                
                {/* Navigation Items */}
                <div className="flex-1 p-4 overflow-y-auto">
                    <nav className="space-y-1">
                        {navItems.map((item, index) => (
                            <Link 
                                key={index}
                                href={item.href} 
                                className="flex items-center px-2 py-3 text-sm font-medium rounded-md hover:bg-indigo-800 transition-colors"
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Logout Button */}
                <div className="p-4 border-t border-indigo-800">
                    <Link 
                        href="/logout" 
                        method="post" 
                        as="button" 
                        className="flex items-center w-full px-2 py-3 text-sm font-medium text-white rounded-md hover:bg-indigo-800 transition-colors"
                    >
                        <LogOut size={18} className="mr-3" />
                        {translate('logout')}
                    </Link>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-x-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm lg:hidden">
                    <div className="flex items-center justify-between px-4 py-4">
                        <div className="flex items-center">
                            <button 
                                className="mr-4 lg:hidden text-gray-600"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <Menu size={24} />
                            </button>
                           
                        </div>
                    </div>
                </header>

                {/* Main content area */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;