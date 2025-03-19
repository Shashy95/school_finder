import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useLanguage } from '@/Components/LanguageContext';

const CreateSchool = ({ regions, categories, types, genders, levels }) => {
    // Destructure both `translate` and `language` from the context
    const { translate, language } = useLanguage();

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        region_id: '',
        location: '',
        category_id: '',
        type_id: '',
        gender_id: '',
        level_id: '',
        levels_with_subjects: '',
        en_description: '',
        sw_description: '',
        website: '',
        social_media_links: '',
        phone: '',
        email: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.schools.store'), {
            onSuccess: () => {
                toastr.success(translate('schoolCreatedSuccessfully'));
            },
            onError: () => {
                toastr.error(translate('schoolCreationFailed'));
            },
        });
    };

    return (
        <AdminLayout>
            <Head title={translate('addNewSchool')} />
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-6">{translate('addNewSchool')}</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Name */}
    <div className="mb-4">
        <label className="block text-gray-700">{translate('name')}</label>
        <input
            type="text"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
            className="w-full p-2 border rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
    </div>

    {/* Region */}
    <div className="mb-4">
        <label className="block text-gray-700">{translate('region')}</label>
        <select
            value={data.region_id}
            onChange={(e) => setData('region_id', e.target.value)}
            className="w-full p-2 border rounded"
        >
            <option value="">{translate('selectRegion')}</option>
            {regions.map((region) => (
                <option key={region.id} value={region.id} className="whitespace-normal">
                    {region.name}
                </option>
            ))}
        </select>
        {errors.region_id && <p className="text-red-500">{errors.region_id}</p>}
    </div>

    {/* Location */}
    <div className="mb-4">
        <label className="block text-gray-700">{translate('location')}</label>
        <input
            type="text"
            value={data.location}
            onChange={(e) => setData('location', e.target.value)}
            className="w-full p-2 border rounded"
        />
        {errors.location && <p className="text-red-500">{errors.location}</p>}
    </div>

    {/* Category */}
    <div className="mb-4">
        <label className="block text-gray-700">{translate('category')}</label>
        <select
            value={data.category_id}
            onChange={(e) => setData('category_id', e.target.value)}
            className="w-full p-2 border rounded"
        >
            <option value="">{translate('selectCategory')}</option>
            {categories.map((category) => (
                <option key={category.id} value={category.id} className="whitespace-normal">
                    {category[`name_${language}`]}
                </option>
            ))}
        </select>
        {errors.category_id && <p className="text-red-500">{errors.category_id}</p>}
    </div>

    {/* Type */}
    <div className="mb-4">
        <label className="block text-gray-700">{translate('type')}</label>
        <select
            value={data.type_id}
            onChange={(e) => setData('type_id', e.target.value)}
            className="w-full p-2 border rounded"
        >
            <option value="">{translate('selectType')}</option>
            {types.map((type) => (
                <option key={type.id} value={type.id} className="whitespace-normal">
                    {type[`name_${language}`]}
                </option>
            ))}
        </select>
        {errors.type_id && <p className="text-red-500">{errors.type_id}</p>}
    </div>

    {/* Gender */}
    <div className="mb-4">
        <label className="block text-gray-700">{translate('gender')}</label>
        <select
            value={data.gender_id}
            onChange={(e) => setData('gender_id', e.target.value)}
            className="w-full p-2 border rounded"
        >
            <option value="">{translate('selectGender')}</option>
            {genders.map((gender) => (
                <option key={gender.id} value={gender.id} className="whitespace-normal">
                    {gender[`name_${language}`]}
                </option>
            ))}
        </select>
        {errors.gender_id && <p className="text-red-500">{errors.gender_id}</p>}
    </div>

    {/* Level */}
    <div className="mb-4">
        <label className="block text-gray-700">{translate('level')}</label>
        <select
            value={data.level_id}
            onChange={(e) => setData('level_id', e.target.value)}
            className="w-full p-2 border rounded"
        >
            <option value="">{translate('selectLevel')}</option>
            {levels.map((level) => (
                <option key={level.id} value={level.id} className="whitespace-normal">
                    {level[`name_${language}`]}
                </option>
            ))}
        </select>
        {errors.level_id && <p className="text-red-500">{errors.level_id}</p>}
    </div>

    {/* Levels with Subjects */}
    <div className="mb-4 col-span-1 md:col-span-2">
        <label className="block text-gray-700">{translate('levelsWithSubjects')}</label>
        <textarea
            value={data.levels_with_subjects}
            onChange={(e) => setData('levels_with_subjects', e.target.value)}
            className="w-full p-2 border rounded"
        />
        {errors.levels_with_subjects && <p className="text-red-500">{errors.levels_with_subjects}</p>}
    </div>

    {/* English Description */}
    <div className="mb-4 col-span-1 md:col-span-2">
        <label className="block text-gray-700">{translate('enDescription')}</label>
        <textarea
            value={data.en_description}
            onChange={(e) => setData('en_description', e.target.value)}
            className="w-full p-2 border rounded"
        />
        {errors.en_description && <p className="text-red-500">{errors.en_description}</p>}
    </div>

    {/* Swahili Description */}
    <div className="mb-4 col-span-1 md:col-span-2">
        <label className="block text-gray-700">{translate('swDescription')}</label>
        <textarea
            value={data.sw_description}
            onChange={(e) => setData('sw_description', e.target.value)}
            className="w-full p-2 border rounded"
        />
        {errors.sw_description && <p className="text-red-500">{errors.sw_description}</p>}
    </div>

    {/* Website */}
    <div className="mb-4">
        <label className="block text-gray-700">{translate('website')}</label>
        <input
            type="text"
            value={data.website}
            onChange={(e) => setData('website', e.target.value)}
            className="w-full p-2 border rounded"
        />
        {errors.website && <p className="text-red-500">{errors.website}</p>}
    </div>

    {/* Social Media Links */}
    <div className="mb-4">
        <label className="block text-gray-700">{translate('socialMediaLinks')}</label>
        <textarea
            value={data.social_media_links}
            onChange={(e) => setData('social_media_links', e.target.value)}
            className="w-full p-2 border rounded"
        />
        {errors.social_media_links && <p className="text-red-500">{errors.social_media_links}</p>}
    </div>

    {/* Phone */}
    <div className="mb-4">
        <label className="block text-gray-700">{translate('phone')}</label>
        <input
            type="text"
            value={data.phone}
            onChange={(e) => setData('phone', e.target.value)}
            className="w-full p-2 border rounded"
        />
        {errors.phone && <p className="text-red-500">{errors.phone}</p>}
    </div>

    {/* Email */}
    <div className="mb-4">
        <label className="block text-gray-700">{translate('email')}</label>
        <input
            type="email"
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
            className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
    </div>

    {/* Submit Button */}
    <div className="col-span-1 md:col-span-2">
        <button type="submit" disabled={processing} className="bg-blue-500 text-white px-4 py-2 rounded">
            {processing ? translate('saving') : translate('save')}
        </button>
    </div>
</form>
            </div>
        </AdminLayout>
    );
};

export default CreateSchool;