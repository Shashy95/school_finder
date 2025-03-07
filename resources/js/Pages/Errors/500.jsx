import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { useLanguage } from '@/Components/LanguageContext';

const Error500 = () => {
  const { translate } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Head title="500 - Server Error" />
      
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-24 w-24 rounded-full bg-red-100"></div>
          </div>
          <div className="relative">
            <svg className="w-24 h-24 mx-auto text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500">500</h1>
        <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-4">{translate('serverErrorTitle', 'Server Error')}</h2>
        
        <div className="h-1 w-16 bg-red-600 mx-auto mb-6"></div>
        
        <p className="text-gray-600 mb-3">{translate('serverError', 'Sorry, something went wrong on our servers.')}</p>
        <p className="text-gray-500 mb-8 text-sm">{translate('serverErrorDesc', 'We\'re working on fixing the problem. Please try again later.')}</p>
        
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition duration-200 shadow-md"
          >
            {translate('tryAgain', 'Try Again')}
          </button>
          <Link 
            href="/" 
            className="px-5 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition duration-200"
          >
            {translate('goBackHome', 'Back to Home')}
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
          {translate('needHelp', 'Need help?')} <a href="#" className="text-red-600 hover:underline">{translate('contactSupport', 'Contact Support')}</a>
        </div>
      </div>
    </div>
  );
};

export default Error500;