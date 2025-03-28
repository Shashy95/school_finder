<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Gender;
use App\Models\Level;
use App\Models\Region;
use App\Models\School;
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
        $query = School::query()->with(['levels']); // Eager load levels relationship
    
        // Apply filters if provided
        if ($request->filled('name')) {
            $query->where('name', 'LIKE', '%' . $request->name . '%');
        }
    
        if ($request->filled('region')) {
            $query->where('region_id', $request->region);
        }
    
        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }
    
        if ($request->filled('type')) {
            $query->where('type_id', $request->type);
        }
    
        if ($request->filled('gender')) {
            $query->where('gender_id', $request->gender);
        }
    
        // Updated level filter for many-to-many relationship
        if ($request->filled('level')) {
            $query->whereHas('levels', function($q) use ($request) {
                $q->where('levels.id', $request->level);
            });
        }
    
        $schools = $query->paginate(10)->appends($request->query());
    
        return Inertia::render('Schools/List', [
            'schools' => $schools,
            'filters' => $request->all(),
            
        ]);
    }

    public function show($slug)
    {
        // Check if the identifier is a UUID or a slug
        $school = School::with(['region', 'category', 'type', 'gender', 'levels'])->where('slug', $slug)->firstOrFail();
        return Inertia::render('Schools/Detail', ['school' => $school]);
    }


/**
     * Handle the request to fetch name suggestions for autosuggestion.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSuggestions(Request $request)
    {
        // Validate the input query (ensure it's safe to use)
        $validated = $request->validate([
            'name' => 'required|string|min:3', // Minimum 3 characters
        ]);

        // Fetch suggestions from the School model based on the name
        $suggestions = School::where('name', 'like', '%' . $validated['name'] . '%')
            ->limit(10) // Limit the number of suggestions
            ->get(['name']); // Fetch only the name field (you can adjust this as needed)

        return response()->json($suggestions);
    }

   
}
