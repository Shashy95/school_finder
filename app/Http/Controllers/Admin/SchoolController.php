<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\School;
use App\Models\Category;
use App\Models\Gender;
use App\Models\Level;
use App\Models\Region;
use App\Models\Type;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class SchoolController extends Controller
{
    public function index()
    {
        $schools = School::with(['region', 'category', 'type', 'gender', 'level'])->get();
        return Inertia::render('Admin/School/Index', ['schools' => $schools]);
    }

    public function create()
    {
        $regions = Region::all();
        $genders = Gender::all();
        $levels = Level::all();
        $types = Type::all();
        $categories = Category::all();

        return Inertia::render('Admin/School/Create',[
            'regions' => $regions,
            'genders' => $genders,
            'levels' => $levels,
            'types' => $types,
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'region_id' => 'nullable|exists:regions,id',
            'location' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'type_id' => 'required|exists:types,id',
            'gender_id' => 'required|exists:genders,id',
            'level_id' => 'required|exists:levels,id',
            'levels_with_subjects' => 'nullable|json',
            'en_description' => 'required|string',
            'sw_description' => 'required|string',
            'website' => 'nullable|url',
            'social_media_links' => 'nullable|json',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
        ]);

        // If validation fails, redirect back with errors
        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        // Create a new school
        $school = School::create([
            'name' => $request->input('name'),
            'region_id' => $request->input('region_id'),
            'location' => $request->input('location'),
            'category_id' => $request->input('category_id'),
            'type_id' => $request->input('type_id'),
            'gender_id' => $request->input('gender_id'),
            'level_id' => $request->input('level_id'),
            'levels_with_subjects' => $request->input('levels_with_subjects'),
            'en_description' => $request->input('en_description'),
            'sw_description' => $request->input('sw_description'),
            'website' => $request->input('website'),
            'social_media_links' => $request->input('social_media_links'),
            'phone' => $request->input('phone'),
            'email' => $request->input('email'),
        ]);

        return redirect()->route('admin.schools.index')->with('success', 'School created successfully.');
    }

    public function edit(School $school)
    {
        return Inertia::render('Admin/School/Edit', ['school' => $school]);
    }

    public function update(Request $request, School $school)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            // Add more validation rules as needed
        ]);

        $school->update($request->all());

        return redirect()->route('admin.schools.index')->with('success', 'School updated successfully.');
    }

    public function destroy(School $school)
    {
        $school->delete();
        return redirect()->route('admin.schools.index')->with('success', 'School deleted successfully.');
    }
}