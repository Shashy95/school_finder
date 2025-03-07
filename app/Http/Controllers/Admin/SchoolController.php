<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\School;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SchoolController extends Controller
{
    public function index()
    {
        $schools = School::all();
        return Inertia::render('Admin/School/Index', ['schools' => $schools]);
    }

    public function create()
    {
        return Inertia::render('Admin/School/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            // Add more validation rules as needed
        ]);

        School::create($request->all());

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