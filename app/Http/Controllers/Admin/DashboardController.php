<?php


namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\School;
use App\Models\SearchLog;
use App\Models\Gender;
use App\Models\Type;
use App\Models\Level;
use App\Models\Subject;
use App\Models\Region;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // Core metrics
        $totalSchools = School::count();
        $schoolsAddedToday = School::whereDate('created_at', Carbon::today())->count();
        
        // Weekly schools added
        $startOfWeek = Carbon::now()->startOfWeek();
        $schoolsAddedThisWeek = [
            'sunday' => School::whereDate('created_at', $startOfWeek)->count(),
            'monday' => School::whereDate('created_at', $startOfWeek->copy()->addDay(1))->count(),
            'tuesday' => School::whereDate('created_at', $startOfWeek->copy()->addDay(2))->count(),
            'wednesday' => School::whereDate('created_at', $startOfWeek->copy()->addDay(3))->count(),
            'thursday' => School::whereDate('created_at', $startOfWeek->copy()->addDay(4))->count(),
            'friday' => School::whereDate('created_at', $startOfWeek->copy()->addDay(5))->count(),
            'saturday' => School::whereDate('created_at', $startOfWeek->copy()->addDay(6))->count(),
        ];

        // School categories
        $schoolCategories = Category::withCount('schools')->get()->map(function($category) {
            return ['name' => $category->name_en, 'count' => $category->schools_count];
        });

        // Gender distribution
        $schoolsByGender = Gender::withCount('schools')->get()->map(function($gender) {
            return ['gender' => $gender->name_en, 'count' => $gender->schools_count];
        });

        // Level distribution
        $schoolsByLevel = Level::withCount('schools')->get()->map(function($level) {
            return ['level' => $level->name_en, 'count' => $level->schools_count];
        });

        // Regional distribution
        $schoolsByRegion = Region::withCount('schools')
            ->orderByDesc('schools_count')
            ->limit(5)
            ->get()
            ->map(function($region) {
                return ['region' => $region->name, 'count' => $region->schools_count];
            });

        // Subject popularity
        $popularSubjects = DB::table('school_subjects')
        ->select('subjects.name_en as subject', DB::raw('COUNT(*) as count'))
        ->join('subjects', 'school_subjects.subject_id', '=', 'subjects.id')
        ->groupBy('subjects.name_en')
        ->orderByDesc('count')
        ->limit(10)
        ->get()
        ->map(function($item) {
            return ['subject' => $item->subject, 'count' => $item->count];
        });

        // School types
        $schoolsByType = Type::withCount('schools')->get()->map(function($type) {
            return ['type' => $type->name_en, 'count' => $type->schools_count];
        });

        // Completion stats
        $completeSchools = School::whereNotNull('website')
            ->whereNotNull('phone')
            ->whereNotNull('email')
            ->count();

            $popularSearches = $this->getPopularSearchCriteria();

        return Inertia::render('Admin/Dashboard', [
            // Core metrics
            'totalSchools' => $totalSchools,
            'schoolsAddedToday' => $schoolsAddedToday,
            'schoolsAddedThisWeek' => $schoolsAddedThisWeek,
            
            // Distribution data
            'schoolCategories' => $schoolCategories,
            'schoolsByGender' => $schoolsByGender,
            'schoolsByLevel' => $schoolsByLevel,
            'schoolsByRegion' => $schoolsByRegion,
            'popularSubjects' => $popularSubjects,
            'schoolsByType' => $schoolsByType,
            'popularSearches' => $popularSearches,
            
            // Completion stats
            'completeSchools' => $completeSchools,
            'totalSchools' => $totalSchools,
            
            // Activity metrics
            'monthlyAdded' => School::whereMonth('created_at', now()->month)->count(),
            'monthlyUpdated' => School::whereMonth('updated_at', now()->month)
                                ->whereRaw('created_at != updated_at')
                                ->count(),
            'uniqueVisitors' => SearchLog::distinct('searched_by_ip')->count()
        ]);
    }

 private function getPopularSearchCriteria()
{
    $searchLogs = SearchLog::all();
    $criteriaCounts = [];

    foreach ($searchLogs as $log) {
        try {
            $criteria = is_string($log->search_criteria) 
                ? json_decode($log->search_criteria, true)
                : $log->search_criteria;

            if (!is_array($criteria)) {
                continue;
            }

            // Split combined criteria and count each component separately
            foreach ($criteria as $key => $value) {
                $identifier = $this->getCriteriaIdentifier($key, $value);
                
                if (!isset($criteriaCounts[$identifier])) {
                    $criteriaCounts[$identifier] = [
                        'count' => 0,
                        'key' => $key,
                        'value' => $value
                    ];
                }
                $criteriaCounts[$identifier]['count']++;
            }
        } catch (\Exception $e) {
            continue;
        }
    }

    // Sort by count descending and take top 5
    return collect($criteriaCounts)
        ->sortByDesc('count')
        ->take(5)
        ->values()
        ->toArray();
}

private function getCriteriaIdentifier($key, $value)
{
    if (is_array($value)) {
        $name = $value['name'] ?? $value['name_en'] ?? $value['name_sw'] ?? json_encode($value);
        return $key.':'.$name;
    }
    return $key.':'.$value;
}


}