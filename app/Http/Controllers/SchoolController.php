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
        $query = School::query();

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

        if ($request->filled('level')) {
            $query->where('level_id', $request->level);
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
        $school = School::where('slug', $slug)->firstOrFail();
        return Inertia::render('Schools/Detail', ['school' => $school]);
    }
   
}
