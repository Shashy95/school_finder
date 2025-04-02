import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useLanguage } from '@/Components/LanguageContext';


const SearchResults = ({ schools, filters }) => {
    const { translate, language } = useLanguage();
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading finish after component mount or language change
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);



             // Skeleton loader component
    const SkeletonLoader = () => (
        <div className="container mx-auto p-6">
        {/* Header Skeleton */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-pulse">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="h-8 bg-gray-300 rounded w-3/4 mb-4 md:mb-0"></div>
                <div className="flex space-x-3">
                    <div className="h-6 bg-gray-300 rounded w-20"></div>
                </div>
            </div>
        </div>
{/* Active Filters Skeleton */}
<div className="mt-6 pt-4 border-t border-gray-200 animate-pulse">
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
                <div className="flex flex-wrap gap-2">
                    <div className="h-6 bg-gray-300 rounded w-24 mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded w-24 mb-2"></div>
                    <div className="h-6 bg-gray-300 rounded w-24 mb-2"></div>
                </div>
            </div>

            {/* Results Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                        <div className="h-32 bg-gray-300 rounded-t-xl mb-4"></div>
                        <div className="p-6 space-y-4">
                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                            <div className="flex space-x-4">
                                <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                                <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                                <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                            </div>
                            <div className="h-8 bg-gray-300 rounded mt-4 w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>

             {/* Pagination Skeleton */}
             <div className="mt-10 flex justify-center space-x-1 animate-pulse">
                <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            </div>
        </div>
    );
    

    if (isLoading) {
        return (
            <div className="container mx-auto p-4 sm:p-6">
                <SkeletonLoader />
            </div>
        );
    }

    

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
                        
                       
                    </div>
                </div>
                

            
           {/* Active Filters Display */}
{Object.values(filters).some(value => value) && (
    <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-500 mb-3">{translate('activeFilters')}:</h3>
        <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => (
                value ? ( // If filter is applied
                    <div key={key} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center">
                        {translate(key)}: 
                        <span className="font-medium ml-1">
                            {value.name_en && value.name_sw 
                                ? (language === 'sw' ? value.name_sw : value.name_en) // Handle translation
                                : value.name} {/* Handle simple 'name' */}
                        </span>
                       
                    </div>
                ) : null
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
            {/* School Card Header */}
            <div className="h-32 bg-gradient-to-r from-indigo-500 to-indigo-700 relative">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                    <div className="text-xs font-semibold bg-indigo-800 bg-opacity-70 px-2 py-1 rounded-full inline-block mb-1">
                        {school.type ? (language === 'sw' ? school.type.name_sw : school.type.name_en) : translate('school')}
                    </div>
                    <h3 className="text-xl font-bold truncate w-full text-white">{school.name}</h3>
                </div>
            </div>

            {/* School Card Body */}
            <div className="p-6 space-y-4">
                {/* Location */}
                <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-700">
                        {school.location ? `${school.location}, ${school.region ? school.region.name : ''}` : translate('locationNotAvailable')}
                    </p>
                </div>

                {/* Gender */}
                {school.gender && (
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-gray-700">{translate('gender')}: <span className="font-medium">{school.gender.name_en ? (language === 'sw' ? school.gender.name_sw : school.gender.name_en) : school.gender}</span></span>
                    </div>
                )}

                {/* Levels */}
                {school.levels && (
                    <div className="flex flex-wrap gap-2">
                        {school.levels.map((level, index) => (
                            <span key={index} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                                {language === 'sw' ? level.name_sw : level.name_en}
                            </span>
                        ))}
                    </div>
                )}

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
                            
                           
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchResults;