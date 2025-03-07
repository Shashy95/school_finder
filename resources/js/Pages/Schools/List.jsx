import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { useLanguage } from '@/Components/LanguageContext';

const SearchResults = ({ schools, filters }) => {
    const { translate } = useLanguage();

    return (
        <div className="container mx-auto p-6">
            <Head title={translate('searchResults')} />
            
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <h2 className="text-3xl font-bold text-indigo-700 mb-4 md:mb-0">
                        {translate('searchResults')}
                    </h2>
                    
                    <div className="flex space-x-3">
                        <Link
                            href="/"
                            className="flex items-center text-gray-600 hover:text-indigo-600 transition duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            {translate('backToHome')}
                        </Link>
                        
                        <button
                            className="flex items-center px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            {translate('filter')}
                        </button>
                    </div>
                </div>
                
                {/* Active Filters Display - Optional */}
                {Object.values(filters).some(value => value) && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-500 mb-3">{translate('activeFilters')}:</h3>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(filters).map(([key, value]) => (
                                value && (
                                    <div key={key} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center">
                                        {translate(key)}: <span className="font-medium ml-1">{value}</span>
                                        <button className="ml-1 text-indigo-500 hover:text-indigo-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Results Count */}
            <div className="mb-6 text-gray-600">
                {schools.total > 0 ? (
                    <p>
                        {translate('showing')} <span className="font-medium">{schools.from}</span> {translate('to')} <span className="font-medium">{schools.to}</span> {translate('of')} <span className="font-medium">{schools.total}</span> {translate('schools')}
                    </p>
                ) : null}
            </div>

            {/* No Results */}
            {schools.data.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{translate('noSchoolsFound')}</h3>
                    
                    <Link
                        href="/"
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 rounded-lg text-white hover:bg-indigo-700 transition duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {translate('backToSearch')}
                    </Link>
                </div>
            ) : (
                <>
                    {/* School Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {schools.data.map((school) => (
                            <div key={school.id} className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl hover:translate-y-0.5 transform">
                                {/* School Card Header - You can add image here if available */}
                                <div className="h-32 bg-gradient-to-r from-indigo-500 to-indigo-700 relative">
                                    <div className="absolute inset-0 bg-black opacity-20"></div>
                                    <div className="absolute bottom-0 left-0 p-4 text-white">
                                        <div className="text-xs font-semibold bg-indigo-800 bg-opacity-70 px-2 py-1 rounded-full inline-block mb-1">
                                            {school.type || translate('school')}
                                        </div>
                                        <h3 className="text-xl font-bold truncate">{school.name}</h3>
                                    </div>
                                </div>
                                
                                {/* School Card Body */}
                                <div className="p-6">
                                    <div className="flex items-start mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <p className="text-gray-700">{school.location || translate('locationNotAvailable')}</p>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        {school.level && (
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                                </svg>
                                                <span className="text-gray-700">{translate('level')}: <span className="font-medium">{school.level}</span></span>
                                            </div>
                                        )}
                                        
                                        {school.gender && (
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <span className="text-gray-700">{translate('gender')}: <span className="font-medium">{school.gender}</span></span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* View Details Button */}
                                    <Link 
                                        href={`/schools/${school.slug}`} 
                                        className="mt-6 w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium py-2 px-4 rounded flex items-center justify-center transition duration-200"
                                    >
                                        {translate('viewDetails')}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Pagination */}
                    {schools.total > schools.per_page && (
                        <div className="mt-10 flex flex-col items-center">
                            <div className="flex justify-center space-x-1">
                                {schools.links.map((link, index) => {
                                    // Convert the HTML entities in the label to actual characters
                                    const label = link.label
                                        .replace('&laquo; Previous', translate('paginationPrevious'))
                                        .replace('Next &raquo;', translate('paginationNext'))
                                        .replace('&laquo;', '«')
                                        .replace('&raquo;', '»');
                                    
                                    // For previous and next buttons
                                    const isPrevious = label === translate('paginationPrevious');
                                    const isNext = label === translate('paginationNext');
                                    
                                    // For number links
                                    const isNumber = !isPrevious && !isNext;
                                    
                                    return (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`
                                                ${isNumber ? 'w-10 h-10' : 'px-3 h-10'} 
                                                flex items-center justify-center rounded-lg font-medium transition duration-200
                                                ${link.active 
                                                    ? 'bg-indigo-600 text-white' 
                                                    : 'bg-white text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'} 
                                                ${!link.url ? 'opacity-50 cursor-not-allowed' : 'shadow-sm'}
                                            `}
                                        >
                                            {isPrevious && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            )}
                                            
                                            {isNumber && label}
                                            
                                            {isNext && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                            
                            <div className="text-sm text-gray-500 mt-4">
                                {translate('showing')} <span className="font-medium">{schools.from}-{schools.to}</span> {translate('of')} <span className="font-medium">{schools.total}</span> {translate('schools')}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchResults;