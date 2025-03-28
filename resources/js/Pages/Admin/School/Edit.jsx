import React, { useState, useMemo } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useLanguage } from '@/Components/LanguageContext';
import toastr from 'toastr';
import RichTextEditor from '@/Components/RichTextEditor';

const EditSchool = ({ 
  school,
  regions = [], 
  categories = [], 
  types = [], 
  genders = [], 
  levels = [], 
  allSubjects = []
}) => {
  const { translate, language } = useLanguage();

  // Initialize selected levels from school data
  const initialLevels = useMemo(() => school.levels?.map(l => l.id) || [], [school.levels]);
  const [selectedLevels, setSelectedLevels] = useState(initialLevels);

  // Format initial subjects data
  const initialSubjects = useMemo(() => {
    const subs = {};
    school.subjects?.forEach(subject => {
      subject.levels?.forEach(level => {
        if (level?.id) {
          subs[level.id] = subs[level.id] || [];
          if (!subs[level.id].includes(subject.id)) {
            subs[level.id].push(subject.id);
          }
        }
      });
    });
    return subs;
  }, [school.subjects]);

  const { data, setData, put, processing, errors } = useForm({
    name: school.name || '',
    region_id: school.region_id || '',
    location: school.location || '',
    category_id: school.category_id || '',
    type_id: school.type_id || '',
    gender_id: school.gender_id || '',
    levels: initialLevels,
    subjects: initialSubjects,
    en_description: school.en_description || '',
    sw_description: school.sw_description || '',
    website: school.website || '',
    social_media_links: school.social_media_links || '',
    phone: school.phone || '',
    email: school.email || '',
  });

  const handleLevelChange = (levelId, isChecked) => {
    const newLevels = isChecked 
      ? [...selectedLevels, levelId] 
      : selectedLevels.filter(id => id !== levelId);
    
    setSelectedLevels(newLevels);
    setData('levels', newLevels);

    if (!isChecked) {
      const newSubjects = {...data.subjects};
      delete newSubjects[levelId];
      setData('subjects', newSubjects);
    }
  };

  const handleSubjectChange = (levelId, subjectId, isChecked) => {
    setData('subjects', {
      ...data.subjects,
      [levelId]: isChecked
        ? [...(data.subjects[levelId] || []), subjectId]
        : (data.subjects[levelId] || []).filter(id => id !== subjectId)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('admin.schools.update', school.id), {
      onSuccess: () => {
        toastr.success(translate('schoolUpdatedSuccessfully'));
      },
      onError: () => {
        toastr.error(translate('schoolUpdateFailed'));
      },
    });
  };

  return (
    <AdminLayout>
      <Head title={translate('editSchool')} />
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">{translate('editSchool')}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-1">{translate('name')} *</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">{translate('region')} *</label>
              <select
                value={data.region_id}
                onChange={(e) => setData('region_id', e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">{translate('selectRegion')}</option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
              {errors.region_id && <p className="text-red-500 text-sm mt-1">{errors.region_id}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">{translate('location')}</label>
              <input
                type="text"
                value={data.location}
                onChange={(e) => setData('location', e.target.value)}
                className="w-full p-2 border rounded"
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">{translate('category')} *</label>
              <select
                value={data.category_id}
                onChange={(e) => setData('category_id', e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">{translate('selectCategory')}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category[`name_${language}`]}
                  </option>
                ))}
              </select>
              {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">{translate('type')} *</label>
              <select
                value={data.type_id}
                onChange={(e) => setData('type_id', e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">{translate('selectType')}</option>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type[`name_${language}`]}
                  </option>
                ))}
              </select>
              {errors.type_id && <p className="text-red-500 text-sm mt-1">{errors.type_id}</p>}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">{translate('gender')} *</label>
              <select
                value={data.gender_id}
                onChange={(e) => setData('gender_id', e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">{translate('selectGender')}</option>
                {genders.map((gender) => (
                  <option key={gender.id} value={gender.id}>
                    {gender[`name_${language}`]}
                  </option>
                ))}
              </select>
              {errors.gender_id && <p className="text-red-500 text-sm mt-1">{errors.gender_id}</p>}
            </div>
          </div>

          {/* Levels Selection */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-3">{translate('levelsOffered')} *</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {levels.map((level) => (
                <div key={level.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`level-${level.id}`}
                    checked={selectedLevels.includes(level.id)}
                    onChange={(e) => handleLevelChange(level.id, e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor={`level-${level.id}`}>
                    {level[`name_${language}`]}
                  </label>
                </div>
              ))}
            </div>
            {errors.levels && <p className="text-red-500 text-sm mt-1">{errors.levels}</p>}
          </div>

          {/* Subjects Selection - Shows ALL subjects for each selected level */}
          {selectedLevels.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-3">{translate('subjectsOffered')}</h3>
              <div className="space-y-4">
                {selectedLevels.map(levelId => {
                  const level = levels.find(l => l.id === levelId);
                  if (!level) return null;

                  // Get ALL subjects for this level
                  const allSubjectsForLevel = allSubjects.filter(subject => 
                    subject.levels?.some(l => l.id === levelId)
                  );

                  return (
                    <div key={`subjects-${levelId}`} className="p-4 border rounded">
                      <h4 className="font-medium mb-3">{level[`name_${language}`]}</h4>
                      
                      {allSubjectsForLevel.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {allSubjectsForLevel.map(subject => (
                            <div key={`${levelId}-${subject.id}`} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`subject-${levelId}-${subject.id}`}
                                checked={(data.subjects[levelId] || []).includes(subject.id)}
                                onChange={(e) => handleSubjectChange(levelId, subject.id, e.target.checked)}
                                className="mr-2"
                              />
                              <label htmlFor={`subject-${levelId}-${subject.id}`}>
                                {subject[`name_${language}`]}
                              </label>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">
                          {translate('noSubjectsForLevel')}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Descriptions */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-3">{translate('school_description')}</h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-700 mb-1">{translate('enDescription')}</label>
                <RichTextEditor
                label={translate('enDescription')}
                value={data.en_description}
                onChange={(value) => setData('en_description', value)}
                error={errors.en_description}
                placeholder={translate('enterenDescription')}
              />
                {errors.en_description && <p className="text-red-500 text-sm mt-1">{errors.en_description}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">{translate('swDescription')}</label>
                <RichTextEditor
                label={translate('swDescription')}
                value={data.sw_description}
                onChange={(value) => setData('sw_description', value)}
                error={errors.sw_description}
                placeholder={translate('enterswDescription')}
              />
                {errors.sw_description && <p className="text-red-500 text-sm mt-1">{errors.sw_description}</p>}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-3">{translate('contactInformation')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-1">{translate('website')}</label>
                <input
                  type="url"
                  value={data.website}
                  onChange={(e) => setData('website', e.target.value)}
                  className="w-full p-2 border rounded"
                />
                {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">{translate('socialMediaLinks')}</label>
                <textarea
                  value={data.social_media_links}
                  onChange={(e) => setData('social_media_links', e.target.value)}
                  rows={2}
                  className="w-full p-2 border rounded"
                  placeholder="Facebook, Twitter, Instagram links"
                />
                {errors.social_media_links && <p className="text-red-500 text-sm mt-1">{errors.social_media_links}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">{translate('phone')}</label>
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => setData('phone', e.target.value)}
                  className="w-full p-2 border rounded"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-gray-700 mb-1">{translate('email')}</label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="w-full p-2 border rounded"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="border-t pt-4 flex justify-end">
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {processing ? translate('updating') : translate('updateSchool')}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditSchool;