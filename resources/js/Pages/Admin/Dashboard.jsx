import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useLanguage } from '@/Components/LanguageContext';
import { Head, router } from '@inertiajs/react';
import DashboardCharts from '@/Components/DashboardCharts';
import { 
  School, PlusCircle, Calendar, RefreshCw, CheckCircle, Loader2 
} from 'lucide-react';


const AdminDashboard = ({ 
  totalSchools,
  schoolsAddedToday,
  schoolsAddedThisWeek,
  schoolCategories,
  schoolsByGender,
  schoolsByLevel,
  schoolsByRegion,
  popularSubjects,
  schoolsByType,
  completeSchools,
  monthlyAdded,
  monthlyUpdated,
  popularSearches,
  uniqueVisitors
}) => {
  const { translate } = useLanguage();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(null);

  // Convert weekly data to array
  const weeklyDataArray = Object.values(schoolsAddedThisWeek);
  const totalWeeklySchools = weeklyDataArray.reduce((sum, val) => sum + val, 0);

  const handleRefresh = async () => {
    // Throttle refreshes to 10 seconds
    if (lastRefresh && Date.now() - lastRefresh < 10000) {
       toastr.error(translate('refreshThrottle'));
      return;
    }

    setIsRefreshing(true);
    setLastRefresh(Date.now());

    try {
      router.reload({
        only: [
          'totalSchools',
          'schoolsAddedToday',
          'schoolsAddedThisWeek',
          'schoolCategories',
          'schoolsByGender',
          'schoolsByLevel',
          'schoolsByRegion',
          'popularSubjects',
          'schoolsByType',
          'completeSchools',
          'monthlyAdded',
          'monthlyUpdated',
          'popularSearches',
          'uniqueVisitors'
        ],
        preserveScroll: true
      });
       toastr.success(translate('refreshSuccess'));
    } catch (error) {
       toastr.error(translate('refreshError'));
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <AdminLayout>
      <Head title={translate('dashboard')} />
      
      {/* Header with Refresh Button */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">{translate('dashboard')}</h2>
            <p className="text-gray-500">
              {new Date().toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors ${
              isRefreshing ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isRefreshing ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            {translate('refreshData')}
          </button>
        </div>
      </div>

     {/* Overview Cards */}
     <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">{translate('overview')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Schools */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-sm border border-blue-200 transition-transform hover:scale-[1.02]">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-medium text-blue-700">{translate('totalSchools')}</h4>
                <p className="text-3xl font-bold mt-2">{totalSchools}</p>
              </div>
              <div className="p-3 bg-blue-200 rounded-full">
                <School className="w-6 h-6 text-blue-700" />
              </div>
            </div>
          </div>

           {/* Added Today */}
           <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-sm border border-green-200 transition-transform hover:scale-[1.02]">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-medium text-green-700">{translate('schoolsAddedToday')}</h4>
                <p className="text-3xl font-bold mt-2">{schoolsAddedToday}</p>
              </div>
              <div className="p-3 bg-green-200 rounded-full">
                <PlusCircle className="w-6 h-6 text-green-700" />
              </div>
            </div>
          </div>

          {/* Added This Week */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-sm border border-purple-200 transition-transform hover:scale-[1.02]">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-medium text-purple-700">{translate('schoolsAddedThisWeek')}</h4>
                <p className="text-3xl font-bold mt-2">{totalWeeklySchools}</p>
              </div>
              <div className="p-3 bg-purple-200 rounded-full">
                <Calendar className="w-6 h-6 text-purple-700" />
              </div>
            </div>
          </div>

 {/* Completion Rate */}
 <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-lg shadow-sm border border-indigo-200 transition-transform hover:scale-[1.02]">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="text-lg font-medium text-indigo-700">Profile Completion</h4>
        <p className="text-3xl font-bold mt-2">
          {Math.round((completeSchools / totalSchools) * 100)}%
        </p>
      </div>
      <div className="p-3 bg-indigo-200 rounded-full">
        <CheckCircle className="w-6 h-6 text-indigo-700" />
      </div>
    </div>
  </div>
        </div>
      </div>
        
       

      {/* Charts Section */}
      <DashboardCharts 
        schoolsAddedThisWeek={weeklyDataArray}
        schoolCategories={schoolCategories}
        schoolsByGender={schoolsByGender}
        schoolsByLevel={schoolsByLevel}
        schoolsByRegion={schoolsByRegion}
        popularSubjects={popularSubjects}
        schoolsByType={schoolsByType}
        popularSearches={popularSearches}
        monthlyAdded={monthlyAdded}
        uniqueVisitors={uniqueVisitors}
        isRefreshing={isRefreshing}
      />
    </AdminLayout>
  );
};

export default AdminDashboard;