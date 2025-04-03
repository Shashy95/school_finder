import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children, title }) {
    // Extract title from children if not explicitly provided
    // This assumes the first child component has a title prop or we can get it from Head
    const pageTitle = title || React.Children.toArray(children)[0]?.props?.title || '';
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                   
                    
                    {pageTitle && (
                        <div className="mt-6 text-center">
                            <h2 className="text-3xl font-extrabold text-gray-800">{pageTitle}</h2>
                            <div className="mt-2 h-1 w-16 bg-indigo-600 mx-auto rounded-full"></div>
                        </div>
                    )}
                </div>
                
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="px-6 py-8">
                        {children}
                    </div>
                    
                   
                </div>
            </div>
        </div>
    );
}