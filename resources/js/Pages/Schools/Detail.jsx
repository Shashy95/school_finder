import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useLanguage } from '@/Components/LanguageContext';

const SchoolDetails = ({ school }) => {
    const { language,translate } = useLanguage();
    const [activeTab, setActiveTab] = useState('overview');
    const [menuOpen, setMenuOpen] = useState(false);

    const description = language === 'sw' ? school.sw_description : school.en_description;


    // For fields that reference other tables, we'll need to access them properly
    const regionName = school.region?.name || '';
    const categoryName = language === 'sw' ? school.category?.name_sw : school.category?.name_en;
    const genderName = language === 'sw' ? school.gender?.name_sw : school.gender?.name_en;
    const levelName = language === 'sw' ? school.level?.name_sw : school.level?.name_en;
    const typeName = language === 'sw' ? school.type?.name_sw : school.type?.name_en;

    const {
        name,
        location,
        phone,
        email,
        website,
        founded,
        facilities = [],
        programs = [],
        gallery = [],
        ratings,
    } = school;

    const tabs = [
        { id: 'overview', label: translate('overview') },
        { id: 'facilities', label: translate('facilities') },
        { id: 'programs', label: translate('programs') },
        { id: 'gallery', label: translate('gallery') }
    ];

    return (
        <div className="container mx-auto p-4 sm:p-6">
            <Head title={name} />

            {/* Breadcrumbs */}
            <div className="flex items-center text-sm text-gray-500 mb-6 overflow-x-auto">
                <Link href="/" className="hover:text-indigo-600 transition duration-200 whitespace-nowrap">
                    {translate('home')}
                </Link>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <Link href="/schools" className="hover:text-indigo-600 transition duration-200 whitespace-nowrap">
                    {translate('schools')}
                </Link>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="font-medium text-gray-700 truncate">{name}</span>
            </div>

            {/* School Header Section */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-8">
                <div className="h-48 bg-gradient-to-r from-indigo-600 to-indigo-800 relative">
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                            {typeName && (
                                <span className="bg-indigo-800 bg-opacity-80 px-3 py-1 rounded-full text-sm font-semibold truncate max-w-[150px] sm:max-w-none">
                                    {typeName}
                                </span>
                            )}
                            {genderName && (
                                <span className="bg-indigo-800 bg-opacity-80 px-3 py-1 rounded-full text-sm font-semibold truncate max-w-[150px] sm:max-w-none">
                                    {genderName}
                                </span>
                            )}
                            {levelName && (
                                <span className="bg-indigo-800 bg-opacity-80 px-3 py-1 rounded-full text-sm font-semibold truncate max-w-[150px] sm:max-w-none">
                                    {levelName}
                                </span>
                            )}
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold">{name}</h1>
                        {(location || regionName) && (
                        <div className="flex items-center mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>
                                {location}
                                {location && regionName && <span className="mx-1">•</span>}
                                {regionName && <span className="text-gray-300">{regionName}</span>}
                            </span>
                        </div>
                    )}
                    </div>
                </div>
                
                {/* Quick Info Bar */}
                <div className="p-4 sm:p-6 border-b border-gray-200">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Contact */}
                        <div className="flex items-start">
                            <div className="bg-indigo-100 rounded-lg p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-gray-500">{translate('contact')}</h3>
                                <p className="text-gray-800">{phone || translate('notAvailable')}</p>
                                {email && (
                                    <a href={`mailto:${email}`} className="text-indigo-600 hover:text-indigo-800 text-sm break-all">
                                        {email}
                                    </a>
                                )}
                            </div>
                        </div>
                        
                        {/* Category */}
                        <div className="flex items-start">
                            <div className="bg-indigo-100 rounded-lg p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-gray-500">{translate('category')}</h3>
                                <p className="text-gray-800">{categoryName || translate('notAvailable')}</p>
                            </div>
                        </div>
                        
                        {/* Website */}
                        <div className="flex items-start">
                            <div className="bg-indigo-100 rounded-lg p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-gray-500">{translate('website')}</h3>
                                {website ? (
                                    <a href={website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 break-all">
                                        {website.replace(/(^\w+:|^)\/\//, '')}
                                    </a>
                                ) : (
                                    <p className="text-gray-800">{translate('notAvailable')}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Mobile Tabs Dropdown */}
                <div className="sm:hidden border-b border-gray-200">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left focus:outline-none"
                    >
                        <span className="font-medium text-indigo-600">{tabs.find(tab => tab.id === activeTab)?.label}</span>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-5 w-5 text-gray-500 transition-transform ${menuOpen ? 'transform rotate-180' : ''}`} 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    
                    {/* Mobile Dropdown Menu */}
                    {menuOpen && (
                        <div className="border-t border-gray-100 bg-white">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        setMenuOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 focus:outline-none ${
                                        activeTab === tab.id
                                            ? 'text-indigo-600 bg-indigo-50'
                                            : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Desktop Tabs Navigation */}
                <div className="hidden sm:flex border-b border-gray-200 overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-3 font-medium text-sm whitespace-nowrap focus:outline-none ${
                                activeTab === tab.id
                                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                                    : 'text-gray-500 hover:text-indigo-600'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">{translate('aboutSchool')}</h2>
                        
                        {description ? (
                            <div className="prose max-w-none mb-8">
                                <p className="text-gray-700">{description}</p>
                            </div>
                        ) : (
                            <p className="text-gray-500 italic mb-8">{translate('noDescriptionAvailable')}</p>
                        )}
                        
                        {/* Additional Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                            {/* General Info */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">{translate('generalInfo')}</h3>
                                
                                <div className="space-y-4">
                                    {founded && (
                                        <div className="flex items-start">
                                            <div className="bg-gray-100 rounded-full p-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <h4 className="text-sm font-medium text-gray-500">{translate('founded')}</h4>
                                                <p className="text-gray-800">{founded}</p>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {typeName && (
                                        <div className="flex items-start">
                                            <div className="bg-gray-100 rounded-full p-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <h4 className="text-sm font-medium text-gray-500">{translate('type')}</h4>
                                                <p className="text-gray-800">{typeName}</p>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {genderName && (
                                        <div className="flex items-start">
                                            <div className="bg-gray-100 rounded-full p-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <h4 className="text-sm font-medium text-gray-500">{translate('gender')}</h4>
                                                <p className="text-gray-800">{genderName}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* Ratings & Reviews Summary - if available */}
                            {ratings && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">{translate('ratingsAndReviews')}</h3>
                                    
                                    <div className="bg-indigo-50 rounded-lg p-6">
                                        <div className="flex items-center mb-4">
                                            <div className="text-4xl font-bold text-indigo-600 mr-4">
                                                {ratings.average || "N/A"}
                                            </div>
                                            <div>
                                                {/* Star Rating */}
                                                <div className="flex text-yellow-400 mb-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <svg 
                                                            key={star}
                                                            xmlns="http://www.w3.org/2000/svg" 
                                                            className="h-5 w-5"
                                                            fill={star <= Math.round(ratings.average || 0) ? "currentColor" : "none"}
                                                            viewBox="0 0 24 24" 
                                                            stroke="currentColor"
                                                        >
                                                            <path 
                                                                strokeLinecap="round" 
                                                                strokeLinejoin="round" 
                                                                strokeWidth={star <= Math.round(ratings.average || 0) ? 0 : 1.5} 
                                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
                                                            />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {translate('basedOn')} {ratings.count || 0} {translate('reviews')}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Rating Categories */}
                                        {ratings.categories && Object.entries(ratings.categories).map(([category, value]) => (
                                            <div key={categoryName} className="mb-2">
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span className="text-gray-600">{translate(category)}</span>
                                                    <span className="font-medium">{value}/5</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className="bg-indigo-500 h-2 rounded-full" 
                                                        style={{ width: `${(value / 5) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                
                {/* Facilities Tab */}
                {activeTab === 'facilities' && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-6">{translate('facilities')}</h2>
                        
                        {facilities && facilities.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {facilities.map((facility, index) => (
                                    <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-start">
                                        <div className="bg-indigo-100 rounded-full p-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h4 className="font-medium text-gray-800">{facility.name}</h4>
                                            {facility.description && (
                                                <p className="text-sm text-gray-600 mt-1">{facility.description}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">{translate('noFacilitiesListed')}</p>
                        )}
                    </div>
                )}
                
                {/* Programs Tab */}
                {activeTab === 'programs' && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-6">{translate('programs')}</h2>
                        
                        {programs && programs.length > 0 ? (
                            <div className="space-y-6">
                                {programs.map((program, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                            <h3 className="font-semibold text-lg text-gray-800">{program.name}</h3>
                                        </div>
                                        <div className="p-6">
                                            {program.description && (
                                                <p className="text-gray-700 mb-4">{program.description}</p>
                                            )}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                {program.duration && (
                                                    <div className="flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span><span className="font-medium">{translate('duration')}:</span> {program.duration}</span>
                                                    </div>
                                                )}
                                                {program.fees && (
                                                    <div className="flex items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span><span className="font-medium">{translate('fees')}:</span> {program.fees}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">{translate('noProgramsListed')}</p>
                        )}
                    </div>
                )}
                
                {/* Gallery Tab */}
                {activeTab === 'gallery' && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-6">{translate('gallery')}</h2>
                        
                        {gallery && gallery.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {gallery.map((image, index) => (
                                    <div key={index} className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-200">
                                        <img 
                                            src={image.url} 
                                            alt={image.caption || `${name} - ${index + 1}`} 
                                            className="w-full h-48 object-cover"
                                        />
                                        {image.caption && (
                                            <div className="p-2 bg-gray-50">
                                                <p className="text-sm text-gray-600">{image.caption}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">{translate('noImagesAvailable')}</p>
                        )}
                    </div>
                )}
            </div>
            
            {/* Action Buttons - Mobile Friendly */}
            <div className="mt-8 flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0">
                <Link
                    href="/schools"
                    className="flex items-center justify-center sm:justify-start px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {translate('backToResults')}
                </Link>
                
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <button
                        className="flex items-center justify-center px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        {translate('share')}
                    </button>
                    
                    <button
                        className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {translate('contact')}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SchoolDetails;