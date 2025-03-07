import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm } from '@inertiajs/react';

const SchoolCreate = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        location: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/schools');
    };

    return (
        <AdminLayout>
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">Add New School</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Location</label>
                        <input
                            type="text"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        {errors.location && <p className="text-red-500">{errors.location}</p>}
                    </div>
                    <button type="submit" disabled={processing} className="bg-blue-500 text-white px-4 py-2 rounded">
                        {processing ? 'Saving...' : 'Save'}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default SchoolCreate;