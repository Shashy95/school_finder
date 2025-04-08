import React from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement
} from 'chart.js';
import { useLanguage } from '@/Components/LanguageContext';
import { Loader2 } from 'lucide-react';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement
);

const DashboardCharts = ({ 
  isRefreshing,
  schoolsAddedThisWeek,
  schoolCategories,
  schoolsByGender,
  schoolsByLevel,
  schoolsByRegion,
  popularSubjects,
  schoolsByType,
  popularSearches,
  uniqueVisitors,
  monthlyAdded,
}) => {
  const { language } = useLanguage();

  // Helper function to format search criteria labels
  const formatSearchLabel = (item) => {
    const { key, value } = item;
    let displayValue;
    
    if (typeof value === 'object' && value !== null) {
      displayValue = value[`name_${language}`] || 
                    value.name || 
                    value.name_en || 
                    value.name_sw || 
                    JSON.stringify(value);
    } else {
      displayValue = String(value);
    }
    
    return `${key.charAt(0).toUpperCase() + key.slice(1)}: ${displayValue}`;
  };

  // Chart data generators
  const generateBarData = (labels, data, label, bgColor, borderColor) => ({
    labels,
    datasets: [{
      label,
      data,
      backgroundColor: bgColor,
      borderColor,
      borderWidth: 1
    }]
  });

  const generatePieData = (labels, data, label, colorPalette) => ({
    labels,
    datasets: [{
      label,
      data,
      backgroundColor: colorPalette,
      borderWidth: 1,
      hoverOffset: 4
    }]
  });

  // Chart options
  const baseBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
    scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
  };

  const horizontalBarOptions = {
    ...baseBarOptions,
    indexAxis: 'y',
    scales: {
      x: { beginAtZero: true },
      y: { 
        beginAtZero: true,
        ticks: {
          autoSkip: false
        }
      }
    }
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { 
        position: 'right',
        labels: { boxWidth: 15, padding: 15 }
      } 
    }
  };

  // Chart data
  const weeklyChartData = generateBarData(
    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    schoolsAddedThisWeek,
    'Schools Added This Week',
    'rgba(54, 162, 235, 0.5)',
    'rgba(54, 162, 235, 1)'
  );

  const categoryChartData = generatePieData(
    schoolCategories.map(c => c.name),
    schoolCategories.map(c => c.count),
    'School Categories',
    ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
  );

  const genderChartData = generatePieData(
    schoolsByGender.map(g => g.gender),
    schoolsByGender.map(g => g.count),
    'Schools by Gender',
    ['#9966FF', '#FF9F40', '#4BC0C0']
  );

  const levelChartData = generatePieData(
    schoolsByLevel.map(l => l.level),
    schoolsByLevel.map(l => l.count),
    'Schools by Level',
    ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
  );

  const regionChartData = generateBarData(
    schoolsByRegion.map(r => r.region),
    schoolsByRegion.map(r => r.count),
    'Schools by Region',
    'rgba(75, 192, 192, 0.5)',
    'rgba(75, 192, 192, 1)'
  );

  const typeChartData = generatePieData(
    schoolsByType.map(t => t.type),
    schoolsByType.map(t => t.count),
    'Schools by Type',
    ['#FF6384', '#36A2EB', '#FFCE56']
  );

  const subjectChartData = generateBarData(
    popularSubjects.map(s => s.subject),
    popularSubjects.map(s => s.count),
    'Popular Subjects',
    'rgba(153, 102, 255, 0.5)',
    'rgba(153, 102, 255, 1)'
  );

  const popularSearchesData = {
    labels: popularSearches.map(item => formatSearchLabel(item)),
    datasets: [{
        label: 'Search Count',
        data: popularSearches.map(item => item.count),
        backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)'
        ]
    }]
};

const ChartLoader = () => (
  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
  </div>
);

  return (
    <div className="space-y-6">
      {/* Top Row - Weekly and Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-lg font-medium mb-4">Schools Added This Week</h4>
          <div className="h-64">
            <Bar data={weeklyChartData} options={baseBarOptions} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-lg font-medium mb-4">School Categories Breakdown</h4>
          <div className="h-64">
            <Doughnut data={categoryChartData} options={pieOptions} />
          </div>
        </div>
      </div>

      {/* Second Row - Gender and Types */}
      <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-lg font-medium mb-4">School Categories Breakdown</h4>
                <div className="h-64">
                  <Doughnut data={categoryChartData} options={pieOptions} />
                </div>
        </div>

      {/* Third Row - Levels and Subjects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-lg font-medium mb-4">Schools by Level</h4>
          <div className="h-64">
            <Doughnut data={levelChartData} options={pieOptions} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-lg font-medium mb-4">Popular Subjects</h4>
          <div className="h-64">
            <Bar data={subjectChartData} options={horizontalBarOptions} />
          </div>
        </div>
      </div>

      {/* Fourth Row - Regions and Popular Searches */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h4 className="text-lg font-medium mb-4">Schools by Region</h4>
          <div className="h-64">
            <Bar data={regionChartData} options={horizontalBarOptions} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
        {isRefreshing ? <ChartLoader /> : (
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-lg font-medium mb-4">Popular Search Criteria</h4>
            <div className="h-64">
              <Bar 
                data={{
                  labels: popularSearches.map(item => formatSearchLabel(item)),
                  datasets: [{
                    label: 'Searches',
                    data: popularSearches.map(item => item.count),
                    backgroundColor: 'rgba(255, 159, 64, 0.7)'
                  }]
                }}
                options={{
                  indexAxis: 'y',
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: (context) => `Searches: ${context.raw}`
                      }
                    }
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  {/* Most Active Stat */}
  <div className="bg-white p-4 rounded-lg shadow text-center">
    <div className="text-2xl font-bold text-indigo-600">
      {popularSearches[0]?.count || 0}
    </div>
    <div className="text-gray-500">
      {popularSearches[0]?.key === 'region' ? 'Searches in ' : 'Searches for '}
      {(() => {
        const val = popularSearches[0]?.value;
        return val?.name || val?.name_en || (typeof val === 'string' ? val : 'N/A');
      })()}
    </div>
  </div>
  
  {/* Schools Added */}
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <div className="text-2xl font-bold text-green-600">{monthlyAdded}</div>
        <div className="text-gray-500">New Schools This Month</div>
      </div>
      
      {/* Unique Visitors */}
      <div className="bg-white p-4 rounded-lg shadow text-center">
        <div className="text-2xl font-bold text-blue-600">
          {uniqueVisitors}
        </div>
        <div className="text-gray-500">Unique Visitors</div>
      </div>
    </div>
        </div>
      );
    };

export default DashboardCharts;