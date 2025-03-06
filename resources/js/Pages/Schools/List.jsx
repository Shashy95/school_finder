import React from 'react';
import { Head, Link } from '@inertiajs/react';

const SearchResults = ({ schools, filters }) => {
    return (
        <div className="container mx-auto p-6">
            <Head title="Search Results" />
            <h2 className="text-3xl font-bold text-center mb-6">Search Results</h2>

            {schools.data.length === 0 ? (
                <p className="text-gray-500 text-center">No schools found.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {schools.data.map((school) => (
                            <div key={school.id} className="border p-4 rounded-lg shadow-lg">
                                <h3 className="text-lg font-bold">{school.name}</h3>
                                <p className="text-gray-700">Location: {school.location}</p>
                                <Link href={`/schools/${school.slug}`} className="text-blue-500 hover:underline">
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Hide Pagination if only one page or no schools found */}
                    {schools.total > schools.per_page && (
                        <div className="mt-6 flex justify-center space-x-2">
                            {schools.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-lg ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                                >
                                    {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                </Link>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchResults;
