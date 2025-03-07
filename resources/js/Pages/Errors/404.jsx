import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { useLanguage } from '@/Components/LanguageContext';

const Error404 = () => {
  const { translate } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <Head title="404 - Page Not Found" />
      
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-24 w-24 rounded-full bg-indigo-100"></div>
          </div>
          <div className="relative">
            <svg className="w-24 h-24 mx-auto text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-4">{translate('pageNotFoundTitle', 'Page Not Found')}</h2>
        
        <div className="h-1 w-16 bg-indigo-600 mx-auto mb-6"></div>
        
        <p className="text-gray-600 mb-3">{translate('pageNotFound', "We couldn't find the page you were looking for.")}</p>
        <p className="text-gray-500 mb-8 text-sm">{translate('pageNotFoundDesc', 'The page may have been moved or deleted, or you might have typed the wrong URL.')}</p>
        
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="px-5 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition duration-200"
          >
            {translate('goBack', 'Go Back')}
          </button>
          <Link 
            href="/" 
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full transition duration-200 shadow-md"
          >
            {translate('goBackHome', 'Back to Home')}
          </Link>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500">
          {translate('needHelp', 'Need help?')} <a href="#" className="text-indigo-600 hover:underline">{translate('contactSupport', 'Contact Support')}</a>
        </div>
      </div>
    </div>
  );
};

export default Error404;