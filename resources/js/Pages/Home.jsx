import React from 'react';
import { Head, useForm } from '@inertiajs/react';

const Home = ({ regions, genders, levels, types, categories, language }) => {
    const { data, setData, get, processing } = useForm({
        name: '',
        region: '',
        type: '',
        gender: '',
        level: '',
        category: ''
    });

    // Localization helper
    const getLocalizedValue = (item, field) => {
        const localizedField = `${field}_${language}`;
        return item[localizedField] || item[`${field}_en`] || 'N/A';
    };

    const handleSearch = (e) => {
        e.preventDefault();
        get('/schools');
    };

    return (
        <div className="container mx-auto p-6">
            <Head title="Home" />
            <h1 className="text-3xl font-bold text-center mb-6">School Finder
            </h1>
            
            <form onSubmit={handleSearch} className="bg-white shadow-md rounded-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Enter name"
                            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Region</label>
                        <select
                            value={data.region}
                            onChange={(e) => setData('region', e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Region</option>
                            {regions.map((region, index) => (
                                <option key={index} value={region.id}>
                                    {region.name} {/* Assuming 'name' is the property for region */}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Type</label>
                        <select
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Type</option>
                            {types.map((type, index) => (
                                <option key={index} value={type.id}>
                                    {getLocalizedValue(type, 'name')} {/* Assuming 'name_en' or 'name_sw' */}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                        <select
                            value={data.gender}
                            onChange={(e) => setData('gender', e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Gender</option>
                            {genders.map((gender, index) => (
                                <option key={index} value={gender.id}>
                                    {getLocalizedValue(gender, 'name')} {/* Assuming 'name_en' or 'name_sw' */}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Level</label>
                        <select
                            value={data.level}
                            onChange={(e) => setData('level', e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Level</option>
                            {levels.map((level, index) => (
                                <option key={index} value={level.id}>
                                    {getLocalizedValue(level, 'name')} {/* Assuming 'name_en' or 'name_sw' */}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                        <select
                            value={data.category}
                            onChange={(e) => setData('category', e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.id}>
                                    {getLocalizedValue(category, 'name')} {/* Assuming 'name_en' or 'name_sw' */}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit" disabled={processing} className="bg-blue-500 text-white font-bold py-2 px-4 mt-4 rounded-lg hover:bg-blue-600 transition duration-200">
                    {processing ? 'Searching...' : 'Search'}
                </button>
            </form>
        </div>
    );
};

export default Home;