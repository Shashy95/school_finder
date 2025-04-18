import React, { useState, useMemo } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from 'react-data-table-component';
import { useLanguage } from '@/Components/LanguageContext';
import { useForm,Head, Link } from '@inertiajs/react';
import { PlusCircle, Search, Filter, Edit, Trash } from 'lucide-react';
import Swal from 'sweetalert2';

const SchoolIndex = ({ schools }) => {
    const { translate, language } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        level: '',
        category: '',
        type: '',
        gender: '',
        region: ''
    });

    // Add Inertia form helper
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        Swal.fire({
            title: translate('areYouSureDeleteSchool'),
            text: translate('youWontBeAbleToRevertThis'),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: translate('yesDeleteIt'),
            cancelButtonText: translate('cancel'),
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('admin.schools.destroy', id), {
                    onSuccess: () => {
                        Swal.fire(
                            translate('deleted'),
                            translate('schoolDeletedSuccessfully'),
                            'success'
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            translate('error'),
                            translate('schoolDeletionFailed'),
                            'error'
                        );
                    }
                });
            }
        });
    };

    const handleFilterChange = (key, value) => {
        setFilters({
            ...filters,
            [key]: value
        });
    };

    // Get unique values for filters
    const getUniqueValues = (field) => {
        const values = new Set();
        schools.forEach(school => {
            if (field === 'region') {
                if (school.region && school.region.name) {
                    values.add(school.region.name);
                }
            } else if (field === 'level') {
                // Handle multiple levels
                school.levels?.forEach(level => {
                    if (level[`name_${language}`]) {
                        values.add(level[`name_${language}`]);
                    }
                });
            } else {
                if (school[field] && school[field][`name_${language}`]) {
                    values.add(school[field][`name_${language}`]);
                }
            }
        });
        return Array.from(values);
    };

    // Filter data based on search and filters
    const filteredData = useMemo(() => {
        return schools.filter(school => {
            const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                school.location.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesFilters = 
                (!filters.level || (school.levels?.some(level => level[`name_${language}`] === filters.level))) &&
                (!filters.category || (school.category && school.category[`name_${language}`] === filters.category)) &&
                (!filters.type || (school.type && school.type[`name_${language}`] === filters.type)) &&
                (!filters.gender || (school.gender && school.gender[`name_${language}`] === filters.gender)) &&
                (!filters.region || (school.region && school.region.name === filters.region));
            
            return matchesSearch && matchesFilters;
        });
    }, [schools, searchTerm, filters, language]);

    // DataTable columns
    const columns = [
        {
            name: translate('name'),
            selector: row => row.name,
            sortable: true,
        },
        {
            name: translate('level'),
            selector: row => row.levels?.map(level => level[`name_${language}`]).join(', ') || '',
            sortable: true,
            cell: row => (
                <div>
                    {row.levels?.map((level, index) => (
                        <span key={level.id}>
                            {level[`name_${language}`]}
                            {index !== row.levels.length - 1 && ', '}
                        </span>
                    ))}
                </div>
            ),
        },
        {
            name: translate('category'),
            selector: row => row.category?.[`name_${language}`] || 'N/A',
            sortable: true,
        },
        {
            name: translate('type'),
            selector: row => row.type?.[`name_${language}`] || 'N/A',
            sortable: true,
        },
        {
            name: translate('gender'),
            selector: row => row.gender?.[`name_${language}`] || 'N/A',
            sortable: true,
        },
        {
            name: translate('region'),
            selector: row => row.region?.name || 'N/A',
            sortable: true,
        },
        {
            name: translate('location'),
            selector: row => row.location,
            sortable: true,
        },
        {
            name: translate('actions'),
            cell: row => (
                <div className="flex">
                    <Link 
                        href={route('admin.schools.edit', row.id)} 
                        className="px-2 py-1 text-xs font-medium text-blue-600 rounded-md hover:bg-blue-100 flex items-center mr-1"
                    >
                        <Edit size={14} />
                    </Link>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="px-2 py-1 text-xs font-medium text-red-600 rounded-md hover:bg-red-100 flex items-center"
                    >
                        <Trash size={14} />
                    </button>
                </div>
            ),
            button: true,
        }
    ];

    return (
        <AdminLayout title={translate('schools')}>
            <Head title={translate('manageSchools')} />
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">{translate('schools')}</h2>
                    <div className="flex flex-col space-y-3 md:flex-row md:items-center md:space-x-3 md:space-y-0">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="px-4 py-2 text-sm border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 w-full md:w-auto"
                        >
                            <Filter size={16} className="mr-2" />
                            {translate('filter')}
                        </button>
                        <Link
                            href={route('admin.schools.create')}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 flex items-center justify-center w-full md:w-auto"
                        >
                            <PlusCircle size={16} className="mr-2" />
                            {translate('addNewSchool')}
                        </Link>
                    </div>
                </div>

                {/* Filters */}
                {isFilterOpen && (
                    <div className="p-4 border-b bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            {['level', 'category', 'type', 'gender', 'region'].map((filterType) => (
                                <div key={filterType}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {translate(filterType)}
                                    </label>
                                    <select
                                        value={filters[filterType]}
                                        onChange={(e) => handleFilterChange(filterType, e.target.value)}
                                        className="w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="">{translate('all')}</option>
                                        {getUniqueValues(filterType).map((value) => (
                                            <option key={value} value={value}>
                                                {value}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Search bar */}
                <div className="p-4 border-b">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={translate('searchSchools')}
                            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>

                {/* DataTable */}
                <div className="overflow-x-auto">
                    <DataTable
                        columns={columns}
                        data={filteredData}
                        pagination
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[10, 25, 50, 100]}
                        noDataComponent={
                            <div className="flex justify-center items-center p-6 text-gray-500">
                                {translate('noSchoolsFound')}
                            </div>
                        }
                        highlightOnHover
                        persistTableHead
                        
                    />
                </div>
            </div>
        </AdminLayout>
    );
};

export default SchoolIndex;