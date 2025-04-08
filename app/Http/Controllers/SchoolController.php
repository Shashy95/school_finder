<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Gender;
use App\Models\Level;
use App\Models\Region;
use App\Models\School;
use App\Models\SearchLog;
use App\Models\Type;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SchoolController extends Controller
{
    //
    public function index()
    {
        $regions = Region::all();
        $genders = Gender::all();
        $levels = Level::all();
        $types = Type::all();
        $categories = Category::all();

        return Inertia::render('Home', [
            'regions' => $regions,
            'genders' => $genders,
            'levels' => $levels,
            'types' => $types,
            'categories' => $categories
        ]);
         // Render the main page
    }

  

    public function list(Request $request)
    {
        $query = School::query()->with(['region', 'category', 'type', 'gender','levels']); // Eager load levels relationship
    
        // Filters storage
        $filters = [];
    
        // Build the query based on the filters
        if ($request->filled('name')) {
            $query->where('name', 'LIKE', '%' . $request->name . '%');
            $filters['name'] = ['id' => null, 'name' => $request->name];
        }
    
        if ($request->filled('region')) {
            $region = Region::find($request->region);
            $query->where('region_id', $request->region);
            $filters['region'] = $region ? ['id' => $region->id, 'name' => $region->name] : null;
        }
    
        if ($request->filled('category')) {
            $category = Category::find($request->category);
            $query->where('category_id', $request->category);
            $filters['category'] = $category ? ['id' => $category->id, 'name_en' => $category->name_en, 'name_sw' => $category->name_sw] : null;
        }
    
        if ($request->filled('type')) {
            $type = Type::find($request->type);
            $query->where('type_id', $request->type);
            $filters['type'] = $type ? ['id' => $type->id, 'name_en' => $type->name_en, 'name_sw' => $type->name_sw] : null;
        }
    
        if ($request->filled('gender')) {
            $gender = Gender::find($request->gender);
            $query->where('gender_id', $request->gender);
            $filters['gender'] = $gender ? ['id' => $gender->id, 'name_en' => $gender->name_en, 'name_sw' => $gender->name_sw] : null;
        }
    
        if ($request->filled('level')) {
            $query->whereHas('levels', function($q) use ($request) {
                $q->where('levels.id', $request->level);
            });
            $level = Level::find($request->level);
            $filters['level'] = $level ? ['id' => $level->id, 'name_en' => $level->name_en, 'name_sw' => $level->name_sw] : null;
        }
    
        // Log the search criteria to SearchLog model
        SearchLog::create([
            'search_criteria' => json_encode($filters), 
            'searched_by_ip' => $request->ip(),
        ]);
    
        // Perform the search and return paginated results
        $schools = $query->paginate(10)->appends($request->query());
    
        return Inertia::render('Schools/List', [
            'schools' => $schools,
            'filters' => $filters,
        ]);
    }
    
    

    public function show($slug)
    {
        // Check if the identifier is a UUID or a slug
        $school = School::with(['region', 'category', 'type', 'gender', 'levels','subjects.levels'])->where('slug', $slug)->firstOrFail();
        return Inertia::render('Schools/Detail', ['school' => $school]);
    }


    public function suggest(Request $request)
    {
        $query = $request->query('query');
        
        $schools = School::where('name', 'LIKE', "%{$query}%")
                         ->take(10)
                         ->get(['id', 'name']);

        return response()->json($schools);
    }
   
}
