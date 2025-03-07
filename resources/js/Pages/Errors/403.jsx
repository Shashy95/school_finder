import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { useLanguage } from '@/Components/LanguageContext';

const Error403 = () => {
  const { translate } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Head title="403 - Forbidden" />
      
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-24 w-24 rounded-full bg-amber-100"></div>
          </div>
          <div className="relative">
            <svg className="w-24 h-24 mx-auto text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">403</h1>
        <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-4">{translate('forbiddenTitle', 'Access Denied')}</h2>
        
        <div className="h-1 w-16 bg-amber-600 mx-auto mb-6"></div>
        
        <p className="text-gray-600 mb-3">{translate('forbidden', "You don't have permission to access this page.")}</p>
        <p className="text-gray-500 mb-8 text-sm">{translate('forbiddenDesc', 'Please contact your administrator if you believe this is a mistake.')}</p>
        
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="px-5 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition duration-200"
          >
            {translate('goBack', 'Go Back')}
          </button>
          <Link 
            href="/" 
            className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full transition duration-200 shadow-md"
          >
            {translate('goBackHome', 'Back to Home')}
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
          {translate('needHelp', 'Need help?')} <a href="#" className="text-amber-600 hover:underline">{translate('contactSupport', 'Contact Support')}</a>
        </div>
      </div>
    </div>
  );
};

export default Error403;