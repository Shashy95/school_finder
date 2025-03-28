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
use App\Models\Subject;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class SchoolController extends Controller
{
    public function index()
    {
        $schools = School::with(['region', 'category', 'type', 'gender','levels'])->get();
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
            'categories' => $categories,
            'facilities' => [],
            'subjects' => Subject::with('levels')->get(),
        ]);
    }

    public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'region_id' => 'required|exists:regions,id',
        'location' => 'nullable|string',
        'category_id' => 'required|exists:categories,id',
        'type_id' => 'required|exists:types,id',
        'gender_id' => 'required|exists:genders,id',
        'levels' => 'required|array',
        'levels.*' => 'exists:levels,id',
        'subjects' => 'nullable|array',
        'subjects.*' => 'array',
        'subjects.*.*' => 'exists:subjects,id',
        'facilities' => 'nullable|array',
        'facilities.*' => 'exists:facilities,id',
        'en_description' => 'nullable|string',
        'sw_description' => 'nullable|string',
        'website' => 'nullable|url',
        'social_media_links' => 'nullable|string',
        'phone' => 'nullable|string',
        'email' => 'nullable|email'
    ]);

    DB::beginTransaction();
    
    try {
        // Create the school
        $school = School::create([
            'name' => $validated['name'],
            'region_id' => $validated['region_id'],
            'location' => $validated['location'],
            'category_id' => $validated['category_id'],
            'type_id' => $validated['type_id'],
            'gender_id' => $validated['gender_id'],
            'en_description' => $validated['en_description'] ?? null,
            'sw_description' => $validated['sw_description'] ?? null,
            'website' => $validated['website'] ?? null,
            'social_media_links' => $validated['social_media_links'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'email' => $validated['email'] ?? null
        ]);

        // Attach levels using school_levels pivot table
        $school->levels()->sync($validated['levels']);

        // Prepare subjects with level relationships for school_subjects pivot
        $subjectsWithLevels = [];
        foreach ($validated['subjects'] ?? [] as $levelId => $subjectIds) {
            foreach ($subjectIds as $subjectId) {
                $subjectsWithLevels[$subjectId] = ['level_id' => $levelId];
            }
        }
        $school->subjects()->sync($subjectsWithLevels);

        /*
        // Attach facilities if provided
        if (isset($validated['facilities'])) {
            $school->facilities()->sync($validated['facilities']);
        }
            */

        DB::commit();

        return redirect()->route('admin.schools.index')
            ->with('success', 'School created successfully.');

    } catch (ValidationException $e) {
            return back()
                ->withErrors($e->validator)
                ->withInput();        

    } catch (\Exception $e) {
        DB::rollBack();
        return back()
            ->withInput()
            ->with('error', 'Failed to create school: ' . $e->getMessage());
    }
}

public function edit(School $school)
{
    
    return Inertia::render('Admin/School/Edit', [
       'school' => $school->load(['levels', 'subjects.levels']),
        'regions' => Region::all(),
        'categories' => Category::all(),
        'types' => Type::all(),
        'genders' => Gender::all(),
        'levels' => Level::all(),
        'facilities' => [],
        'allSubjects' => Subject::with('levels')->get(),
        'initialSubjects' => $this->formatSubjectsForEdit($school)
    ]);
}


public function update(Request $request, School $school)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'region_id' => 'required|exists:regions,id',
        'location' => 'nullable|string',
        'category_id' => 'required|exists:categories,id',
        'type_id' => 'required|exists:types,id',
        'gender_id' => 'required|exists:genders,id',
        'levels' => 'required|array',
        'levels.*' => 'exists:levels,id',
        'subjects' => 'nullable|array',
        'subjects.*' => 'array',
        'subjects.*.*' => 'exists:subjects,id',
        'facilities' => 'nullable|array',
        'facilities.*' => 'exists:facilities,id',
        'en_description' => 'nullable|string',
        'sw_description' => 'nullable|string',
        'website' => 'nullable|url',
        'social_media_links' => 'nullable|string',
        'phone' => 'nullable|string',
        'email' => 'nullable|email'
    ]);

    DB::beginTransaction();

    try {
        // Update basic school info
        $school->update([
            'name' => $validated['name'],
            'region_id' => $validated['region_id'],
            'location' => $validated['location'],
            'category_id' => $validated['category_id'],
            'type_id' => $validated['type_id'],
            'gender_id' => $validated['gender_id'],
            'en_description' => $validated['en_description'] ?? null,
            'sw_description' => $validated['sw_description'] ?? null,
            'website' => $validated['website'] ?? null,
            'social_media_links' => $validated['social_media_links'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'email' => $validated['email'] ?? null
        ]);

        // Sync levels
        $school->levels()->sync($validated['levels']);

        // Prepare and sync subjects with level relationships
        $subjectsWithLevels = [];
        foreach ($validated['subjects'] ?? [] as $levelId => $subjectIds) {
            foreach ($subjectIds as $subjectId) {
                $subjectsWithLevels[$subjectId] = ['level_id' => $levelId];
            }
        }
        $school->subjects()->sync($subjectsWithLevels);

        // Sync facilities
        if (isset($validated['facilities'])) {
            $school->facilities()->sync($validated['facilities']);
        }

        DB::commit();

        return redirect()->route('admin.schools.index')
            ->with('success', 'School updated successfully.');

        } catch (ValidationException $e) {
            return back()
                ->withErrors($e->validator)
                ->withInput();        

    } catch (\Exception $e) {
        DB::rollBack();
        return back()
            ->withInput()
            ->with('error', 'Failed to update school: ' . $e->getMessage());
    }
}

public function destroy(School $school)
{
    DB::beginTransaction();

    try {
        // Detach all relationships first
        $school->levels()->detach();
        $school->subjects()->detach();
        //$school->facilities()->detach();
        
        // Then delete the school
        $school->delete();

        DB::commit();

        return redirect()->route('admin.schools.index')
            ->with('success', 'School deleted successfully.');

    } catch (\Exception $e) {
        DB::rollBack();
        return back()
            ->with('error', 'Failed to delete school: ' . $e->getMessage());
    }
}

    public function getSubjectsByLevel(Level $level)
{
    return $level->subjects()->with('levels')->get();
}

private function formatSubjectsForEdit(School $school)
{
    return $school->subjects->mapToGroups(function ($subject) {
        return $subject->levels->map(function ($level) use ($subject) {
            return [
                'level_id' => $level->id,
                'subject_id' => $subject->id,
                'subject_name' => $subject->{"name_".app()->getLocale()},
                'level_name' => $level->{"name_".app()->getLocale()}
            ];
        });
    })->flatten(1)->groupBy('level_id')->toArray();
}

}