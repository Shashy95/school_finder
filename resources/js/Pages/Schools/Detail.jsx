import { Head, Link } from '@inertiajs/react';
import React from 'react';
import { useLanguage } from '@/Components/LanguageContext';

const SchoolDetail = ({ school }) => {
    const { translate } = useLanguage();

    return (
        <div className="container mx-auto p-6">
            <Head title={`${translate('schoolDetail')} - ${school.name}`} />
            <h1 className="text-3xl font-bold mb-6">{school.name}</h1>

            <div className="bg-white shadow-md p-6 rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-4">
                    {translate('details')}
                </h2>
                <p className="text-gray-700 mb-4">
                    {translate('location')}: {school.location}
                </p>
                <p className="text-gray-700 mb-4">
                    {translate('type')}: {school.type}
                </p>
                <p className="text-gray-700 mb-4">
                    {translate('level')}: {school.level}
                </p>
                <p className="text-gray-700 mb-4">
                    {translate('gender')}: {school.gender}
                </p>

                <h3 className="text-lg font-bold mb-2">
                    {translate('description')}:
                </h3>
                <p className="text-gray-600">{school.description}</p>
            </div>

            <Link href="/" className="text-blue-500 hover:underline">
                {translate('backToSearchResults')}
            </Link>
        </div>
    );
};

export default SchoolDetail;