import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { useLanguage } from '@/Components/LanguageContext';

const Error401 = () => {
  const { translate } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Head title="401 - Unauthorized" />
      
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-24 w-24 rounded-full bg-purple-100"></div>
          </div>
          <div className="relative">
            <svg className="w-24 h-24 mx-auto text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500">401</h1>
        <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-4">{translate('unauthorizedTitle', 'Authentication Required')}</h2>
        
        <div className="h-1 w-16 bg-purple-600 mx-auto mb-6"></div>
        
        <p className="text-gray-600 mb-3">{translate('unauthorized', 'You need to be logged in to access this page.')}</p>
        <p className="text-gray-500 mb-8 text-sm">{translate('unauthorizedDesc', 'Please log in with an account that has access to this resource.')}</p>
        
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <Link 
            href="/login" 
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full transition duration-200 shadow-md"
          >
            {translate('login', 'Log In')}
          </Link>
          <Link 
            href="/" 
            className="px-5 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition duration-200"
          >
            {translate('goBackHome', 'Back to Home')}
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
          {translate('needHelp', 'Need help?')} <a href="#" className="text-purple-600 hover:underline">{translate('contactSupport', 'Contact Support')}</a>
        </div>
      </div>
    </div>
  );
};

export default Error401;