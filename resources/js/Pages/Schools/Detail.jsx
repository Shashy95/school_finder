import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { useLanguage } from '@/Components/LanguageContext';

const SchoolDetails = ({ school }) => {
    const { language,translate } = useLanguage();
    const [activeTab, setActiveTab] = useState('overview');
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);

        // Simulate loading finish after component mount
        React.useEffect(() => {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 800);
            return () => clearTimeout(timer);
        }, []);

    const description = language === 'sw' ? school.sw_description : school.en_description;


    // For fields that reference other tables, we'll need to access them properly
    const regionName = school.region?.name || '';
    const categoryName = language === 'sw' ? school.category?.name_sw : school.category?.name_en;
    const genderName = language === 'sw' ? school.gender?.name_sw : school.gender?.name_en;
    const typeName = language === 'sw' ? school.type?.name_sw : school.type?.name_en;


    const {
        name,
        location,
        phone,
        email,
        website,
        facilities = [],
        gallery = [],
    } = school;

    const socialMedia = {
        facebook: school.facebook || null,
        twitter: school.twitter || null,
        instagram: school.instagram || null,
        linkedin: school.linkedin || null
    };

    // Facility icons mapping
    const facilityIcons = {
        "Library": (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        "Laboratory": (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        ),
        "Computer Lab": (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ), "Sports Field": (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        "Dormitory": (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
        "Cafeteria": (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    };

     // Default facility icon
     const defaultFacilityIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    );



    const tabs = [
        { id: 'overview', label: translate('overview') },
        { id: 'programs', label: translate('programs') },
        { id: 'facilities', label: translate('facilities') },      
        { id: 'gallery', label: translate('gallery') }
    ];

    // Image lightbox component
    const ImageLightbox = () => {
        if (!lightboxOpen) return null;
        
        return (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
                <div className="relative w-full max-w-4xl">
                    <button 
                        onClick={() => setLightboxOpen(false)}
                        className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    
                    <img 
                        src={gallery[currentImage]?.url} 
                        alt={gallery[currentImage]?.caption || `${name} - Image ${currentImage + 1}`}
                        className="w-full max-h-[80vh] object-contain"
                    />
                    
                    <div className="absolute left-0 right-0 bottom-0 p-4 bg-black bg-opacity-50 text-white">
                        <p>{gallery[currentImage]?.caption || `${name} - Image ${currentImage + 1}`}</p>
                    </div>

                    <button 
                        onClick={() => setCurrentImage((prev) => (prev === 0 ? gallery.length - 1 : prev - 1))}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
                        disabled={gallery.length <= 1}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    
                    <button 
                        onClick={() => setCurrentImage((prev) => (prev === gallery.length - 1 ? 0 : prev + 1))}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70"
                        disabled={gallery.length <= 1}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        );
    };

    // Skeleton loader component
    const SkeletonLoader = () => (
        <div className="animate-pulse">
            <div className="h-48 bg-gray-300 rounded-t-xl mb-4"></div>
            <div className="p-4">
                <div className="h-8 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded mb-6 w-1/2"></div>
                <div className="flex space-x-4 mb-6">
                    <div className="h-10 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-10 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-10 bg-gray-300 rounded w-1/3"></div>
                </div>
                <div className="h-32 bg-gray-300 rounded mb-6"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                </div>
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
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
           
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
                        {/* Contact Info (Phone, Email, Website) */}
                        <div className="flex flex-col items-start space-y-3">
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

                            {/* Social Media Links */}
                            {Object.values(socialMedia).some(value => value) && (
                                <div className="flex items-start pt-2">
                                    <div className="flex space-x-3">
                                        {socialMedia.facebook && (
                                            <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                                </svg>
                                            </a>
                                        )}
                                        {socialMedia.twitter && (
                                            <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                                </svg>
                                            </a>
                                        )}
                                        {socialMedia.instagram && (
                                            <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                                </svg>
                                            </a>
                                        )}
                                        {socialMedia.linkedin && (
                                            <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

                 {/* Mobile Tabs - Sticky */}
               
<div className="sm:hidden border-b border-gray-200 sticky top-0 bg-white z-10 shadow-sm">
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
    
    {/* Mobile Dropdown Menu - Animated */}
    <div className={`transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-64' : 'max-h-0'}`}>
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
    </div>
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
                



            {/* Content Area */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
    {/* Overview Tab */}
    {activeTab === 'overview' && (
        <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">{translate('aboutSchool')}</h2>

            {/* Description with React Quill content */}
            {description ? (
            <div className="prose max-w-none mb-8">
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
            </div>
        ) : (
            <p className="text-gray-500 italic mb-8">{translate('noDescriptionAvailable')}</p>
        )}

            {/* General Info and Category Section combined */}
            <div className="space-y-8 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">{translate('generalInfo')}</h3>

                <div className="space-y-4">
                    {/* General Info Section */}
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

                    {/* Category Section */}
                    {categoryName && (
                        <div className="flex items-start">
                            <div className="bg-gray-100 rounded-full p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h4 className="text-sm font-medium text-gray-500">{translate('category')}</h4>
                                <p className="text-gray-800">{categoryName || translate('notAvailable')}</p>
                            </div>
                        </div>
                    )}

                    {/* Levels Section */}
                    {school.levels && school.levels.length > 0 && (
                        <div className="flex items-start">
                            <div className="bg-gray-100 rounded-full p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6l9 7-9 7-9-7z" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h4 className="text-sm font-medium text-gray-500">{translate('level')}</h4>
                                <p className="text-gray-800">
                            
                                    {school.levels.map(level => (
                                        <span key={level.id} className="inline-block mr-2">
                                            {language === 'sw' ? level.name_sw : level.name_en}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )}

     {/* Programs Tab */}
     {activeTab === 'programs' && (
    <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6">{translate('programs')}</h2>

        {school.levels && school.levels.length > 0 ? (
            <div className="space-y-6">
                {school.levels.map((level) => {
                    const levelSubjects = school.subjects
                        ? school.subjects.filter(subject => subject.pivot && subject.pivot.level_id === level.id)
                        : [];

                    return (
                        <div key={level.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                                <h3 className="font-semibold text-lg text-gray-800">
                                    {language === 'sw' ? level.name_sw : level.name_en}
                                </h3>
                            </div>
                            <div className="p-6">
                                {levelSubjects.length > 0 ? (
                                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                                        {levelSubjects.map((subject) => (
                                            <li key={subject.id} className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                                {language === 'sw' ? subject.name_sw : subject.name_en}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 italic">{translate('noProgramsListed')}</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        ) : (
            <p className="text-gray-500 italic">{translate('noProgramsListed')}</p>
        )}
    </div>
                    )}

            {/* Facilities Tab */}
            {activeTab === 'facilities' && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-6">{translate('facilities')}</h2>
                        
                        {facilities && facilities.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                               // Replace the facilities mapping with this custom icon version
{facilities.map((facility, index) => {
    // Define icons based on facility types
    const getIcon = (name) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('lab')) return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        );
        if (lowerName.includes('library')) return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        );
        if (lowerName.includes('sport') || lowerName.includes('field') || lowerName.includes('gym')) return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        );
        if (lowerName.includes('computer') || lowerName.includes('ict')) return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        );
        if (lowerName.includes('dining') || lowerName.includes('cafeteria')) return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
        );
        // Default icon
        return (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
        );
    };

            return (
                <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-start">
                    <div className="bg-indigo-100 rounded-full p-2">
                        {getIcon(facility.name)}
                    </div>
                    <div className="ml-3">
                        <h4 className="font-medium text-gray-800">{facility.name}</h4>
                        {facility.description && (
                            <p className="text-sm text-gray-600 mt-1">{facility.description}</p>
                        )}
                    </div>
                </div>
            );
        })}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-10 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <p className="text-gray-500 font-medium">{translate('noFacilitiesListed')}</p>
     
                        </div>
                        )}
                    </div>
                )}

              



                {/* Gallery Tab */}
                {activeTab === 'gallery' && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-6">{translate('gallery')}</h2>
                        
                        {gallery && gallery.length > 0 ? (
    <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((image, index) => (
                <div 
                    key={index} 
                    className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-200 cursor-pointer"
                    onClick={() => {
                        setCurrentImage(image);
                        setLightboxOpen(true);
                    }}
                >
                    <div className="relative group">
                        <img 
                            src={image.url} 
                            alt={image.caption || `${name} - ${index + 1}`} 
                            className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-0 w-0 group-hover:h-10 group-hover:w-10 text-white transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                        </div>
                    </div>
                    {image.caption && (
                        <div className="p-2 bg-gray-50">
                            <p className="text-sm text-gray-600">{image.caption}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
        
        {/* Lightbox Modal */}
        {lightboxOpen && currentImage && (
            <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
                <div className="relative max-w-4xl max-h-full p-4">
                    <button 
                        className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-2 text-white z-10"
                        onClick={(e) => {
                            e.stopPropagation();
                            setLightboxOpen(false);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img 
                        src={currentImage.url} 
                        alt={currentImage.caption || name} 
                        className="max-w-full max-h-[80vh] object-contain mx-auto"
                    />
                    {currentImage.caption && (
                        <div className="bg-black bg-opacity-70 text-white p-3 mt-2 rounded">
                            <p>{currentImage.caption}</p>
                        </div>
                    )}
                </div>
            </div>
        )}
    </>
): (
    
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
            className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md font-medium"
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