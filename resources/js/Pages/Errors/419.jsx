import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { useLanguage } from '@/Components/LanguageContext';

const Error419 = () => {
  const { translate } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Head title="419 - Page Expired" />
      
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-24 w-24 rounded-full bg-teal-100"></div>
          </div>
          <div className="relative">
            <svg className="w-24 h-24 mx-auto text-teal-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-green-500">419</h1>
        <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-4">{translate('pageExpiredTitle', 'Page Expired')}</h2>
        
        <div className="h-1 w-16 bg-teal-600 mx-auto mb-6"></div>
        
        <p className="text-gray-600 mb-3">{translate('pageExpired', 'Your session has expired due to inactivity.')}</p>
        <p className="text-gray-500 mb-8 text-sm">{translate('pageExpiredDesc', 'Please refresh the page and try again.')}</p>
        
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-full transition duration-200 shadow-md"
          >
            {translate('refresh', 'Refresh Page')}
          </button>
          <Link 
            href="/" 
            className="px-5 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition duration-200"
          >
            {translate('goBackHome', 'Back to Home')}
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
          {translate('needHelp', 'Need help?')} <a href="#" className="text-teal-600 hover:underline">{translate('contactSupport', 'Contact Support')}</a>
        </div>
      </div>
    </div>
  );
};

export default Error419;