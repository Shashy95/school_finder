import React, { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { useLanguage } from '@/Components/LanguageContext';

const Home = ({ regions, genders, levels, types, categories }) => {

    const { language, translate  } = useLanguage();

    const { data, setData, get, processing } = useForm({
        name: '',
        region: '',
        type: '',
        gender: '',
        level: '',
        category: ''
    });

    const getLocalizedValue = (item, field) => {
        return language === 'sw' ? item[`${field}_sw`] : item[`${field}_en`];
    };

    const handleSearch = (e) => {
        e.preventDefault();
        get('/schools'); // Redirects to search results page
    };

    return (
        <div className="container mx-auto p-6">
            <Head title="Home" />
            <h1 className="text-3xl font-bold text-center mb-6">{translate('welcome')} School Finder</h1>
            <form onSubmit={handleSearch} className="bg-white shadow-md rounded-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">{translate('name')}</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder={translate('name')}
                            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">{translate('region')}</label>
                        <select
                            value={data.region}
                            onChange={(e) => setData('region', e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select {translate('region')}</option>
                            {regions.map((region, index) => (
                                <option key={index} value={region.id}>
                                    {region.name} {/* Assuming 'name' is the property for region */}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">{translate('type')}</label>
                        <select
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select {translate('type')}</option>
                            {types.map((type, index) => (
                                <option key={index} value={type.id}>
                                    {getLocalizedValue(type, 'name')} {/* Assuming 'name_en' or 'name_sw' */}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">{translate('gender')}</label>
                        <select
                            value={data.gender}
                            onChange={(e) => setData('gender', e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select {translate('gender')}</option>
                            {genders.map((gender, index) => (
                                <option key={index} value={gender.id}>
                                    {getLocalizedValue(gender, 'name')} {/* Assuming 'name_en' or 'name_sw' */}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">{translate('level')}</label>
                        <select
                            value={data.level}
                            onChange={(e) => setData('level', e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select {translate('level')}</option>
                            {levels.map((level, index) => (
                                <option key={index} value={level.id}>
                                    {getLocalizedValue(level, 'name')} {/* Assuming 'name_en' or 'name_sw' */}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">{translate('category')}</label>
                        <select
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select {translate('category')}</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.id}>
                                    {getLocalizedValue(category, 'name')} {/* Assuming 'name_en' or 'name_sw' */}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="bg-blue-500 text-white font-bold py-2 px-4 mt-4 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    {processing ? translate('searching') : translate('search')}
                </button>
            </form>
        </div>
    );
};

export default Home;