import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link } from '@inertiajs/react';
import { useLanguage } from '@/Components/LanguageContext';

const SchoolIndex = ({ schools }) => {
    const { translate } = useLanguage();

    return (
        <AdminLayout>
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4">{translate('schools')}</h2>
                <Link href={route('admin.schools.create')} className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
                    {translate('addNewSchool')}
                </Link>
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left">{translate('name')}</th>
                            <th className="text-left">{translate('location')}</th>
                            <th className="text-left">{translate('actions')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schools.map((school) => (
                            <tr key={school.id}>
                                <td>{school.name}</td>
                                <td>{school.location}</td>
                                <td>
                                    <Link href={route('admin.schools.edit', school.id)} className="text-blue-500 hover:underline">
                                        {translate('edit')}
                                    </Link>
                                    <Link
                                        href={route('admin.schools.destroy', school.id)}
                                        method="delete"
                                        as="button"
                                        className="text-red-500 hover:underline ml-2"
                                    >
                                        {translate('delete')}
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default SchoolIndex;