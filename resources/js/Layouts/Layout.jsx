// Layout.jsx
import React from 'react';


const Layout = ({ children, language, switchLanguage }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-700">School Finder</h1>
          
          {/* Language Switcher */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-full">
            <button
              onClick={() => switchLanguage('en')}
              className={`px-4 py-1 rounded-full transition-all duration-200 ${
                language === 'en' 
                  ? 'bg-indigo-600 text-white font-medium shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              English
            </button>
            <button
              onClick={() => switchLanguage('sw')}
              className={`px-4 py-1 rounded-full transition-all duration-200 ${
                language === 'sw' 
                  ? 'bg-indigo-600 text-white font-medium shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Swahili
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} School Finder. {
                language === 'en' 
                  ? 'All rights reserved' 
                  : 'Haki zote zimehifadhiwa'
              } .</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

