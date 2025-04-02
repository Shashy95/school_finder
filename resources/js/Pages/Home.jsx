import React, { useState, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useLanguage } from '@/Components/LanguageContext';
import Loader from '@/Components/Loader';
import axios from 'axios';

const Home = ({ regions, genders, levels, types, categories }) => {
  const { translate } = useLanguage();
  const { props } = usePage();
  const language = props.locale || 'en';

  const [isLoading, setIsLoading] = useState(true); // Page load state
  const [isSearching, setIsSearching] = useState(false); // Search state
  const [suggestions, setSuggestions] = useState([]); // Autocomplete suggestions
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data, setData, get, processing } = useForm({
    name: '',
    region: '',
    type: '',
    gender: '',
    level: '',
    category: ''
  });

  // Simulate page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getLocalizedValue = (item, field) => {
    return language === 'sw' ? item[`${field}_sw`] : item[`${field}_en`];
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);

    get('/schools', {
      preserveState: false,
      onFinish: () => {
        setIsSearching(false);
      }
    });
  };

  const handleClear = () => {
    setData({
      name: '',
      region: '',
      type: '',
      gender: '',
      level: '',
      category: ''
    });
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Fetch suggestions when user types
  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    try {
      const response = await axios.get(`/api/school-suggestions?query=${query}`);
      setSuggestions(response.data);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Head title={translate('home')} />

      {isSearching && <Loader />}

       {/* Hero Section */}
       <div className="bg-indigo-700 text-white rounded-xl shadow-lg mb-10 overflow-hidden">
        <div className="px-8 py-12 md:px-12 md:py-16 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {translate('welcome')} <span className="text-yellow-300">School Finder</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-6">
            Find the perfect school for your educational journey with our comprehensive search tool.
          </p>
        </div>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {translate('search')} {language === 'en' && translate('for')} {translate('schools')}
        </h2>

        <form onSubmit={handleSearch} className="space-y-6">
          {/* School Name Autocomplete */}
          <div className="relative bg-gray-50 p-4 rounded-lg border border-gray-100">
            <label className="block text-gray-700 font-medium mb-2">{translate('name')}</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => {
                setData('name', e.target.value);
                fetchSuggestions(e.target.value);
              }}
              placeholder={`${translate('enter')} ${translate('name')}...`}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
            
            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-200 rounded-lg w-full mt-1 shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                    onClick={() => {
                      setData('name', suggestion.name);
                      setShowSuggestions(false);
                    }}
                  >
                    {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

           {/* Filter Grid */}
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Region */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <label className="block text-gray-700 font-medium mb-2">
                {translate('region')}
              </label>
              <div className="relative">
                <select
                  value={data.region}
                  onChange={(e) => setData('region', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-8 transition-all duration-200"
                >
                  <option value="">{translate('select')} {translate('region')}</option>
                  {regions.map((region, index) => (
                    <option key={index} value={region.id}>
                      {region.name}
                    </option>
                  ))}
                </select>
               
              </div>
            </div>

            {/* Type */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <label className="block text-gray-700 font-medium mb-2">
                {translate('type')}
              </label>
              <div className="relative">
                <select
                  value={data.type}
                  onChange={(e) => setData('type', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-8 transition-all duration-200"
                >
                  <option value="">{translate('select')} {translate('type')}</option>
                  {types.map((type, index) => (
                    <option key={index} value={type.id}>
                      {getLocalizedValue(type, 'name')}
                    </option>
                  ))}
                </select>
                
              </div>
            </div>

            {/* Gender */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <label className="block text-gray-700 font-medium mb-2">
                {translate('gender')}
              </label>
              <div className="relative">
                <select
                  value={data.gender}
                  onChange={(e) => setData('gender', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-8 transition-all duration-200"
                >
                  <option value="">{translate('select')} {translate('gender')}</option>
                  {genders.map((gender, index) => (
                    <option key={index} value={gender.id}>
                      {getLocalizedValue(gender, 'name')}
                    </option>
                  ))}
                </select>
                
              </div>
            </div>

            {/* Level */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <label className="block text-gray-700 font-medium mb-2">
                {translate('level')}
              </label>
              <div className="relative">
                <select
                  value={data.level}
                  onChange={(e) => setData('level', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-8 transition-all duration-200"
                >
                  <option value="">{translate('select')} {translate('level')}</option>
                  {levels.map((level, index) => (
                    <option key={index} value={level.id}>
                      {getLocalizedValue(level, 'name')}
                    </option>
                  ))}
                </select>
                
              </div>
            </div>

            {/* Category */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <label className="block text-gray-700 font-medium mb-2">
                {translate('category')}
              </label>
              <div className="relative">
                <select
                  value={data.category}
                  onChange={(e) => setData('category', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-8 transition-all duration-200"
                >
                  <option value="">{translate('select')} {translate('category')}</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {getLocalizedValue(category, 'name')}
                    </option>
                  ))}
                </select>
                
              </div>
            </div>
          </div>
          

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
            <button
              type="submit"
              disabled={processing}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
            >
              {processing ? (
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
              {processing ? translate('searching') : translate('search')}
            </button>
            
            <button
              type="button"
              onClick={handleClear}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              {translate('clear')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
