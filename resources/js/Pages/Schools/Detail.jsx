import { Head } from '@inertiajs/react';
import React from 'react';

const SchoolDetail = ({ school }) => {
    return (
        <div className="container mx-auto p-6">
           <Head title={`School Detail - ${school.name}`} />
            <h1 className="text-3xl font-bold mb-6">{school.name}</h1>
            
            <div className="bg-white shadow-md p-6 rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-4">Details</h2>
                <p className="text-gray-700 mb-4">Location: {school.location}</p>
                <p className="text-gray-700 mb-4">Type: {school.type}</p>
                <p className="text-gray-700 mb-4">Level: {school.level}</p>
                <p className="text-gray-700 mb-4">Gender: {school.gender}</p>

                <h3 className="text-lg font-bold mb-2">Description:</h3>
                <p className="text-gray-600">{school.description}</p>
            </div>

            <Link href="/" className="text-blue-500 hover:underline">
                Back to Search Results
            </Link>
        </div>
    );
};

export default SchoolDetail;
