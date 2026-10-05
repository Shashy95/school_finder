<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SchoolSeeder extends Seeder
{
    public function run(): void
    {
        // categories: 1=Public, 2=Private
        // types: 1=Day, 2=Boarding, 3=Day & Boarding
        // genders: 1=Boys, 2=Girls, 3=Co-education
        // regions: 1=ARUSHA, 2=DAR ES SALAAM, 3=DODOMA
        // levels: 1=Nursery, 2=Primary, 3=O-level, 4=A-level

        $schools = [
            // ==================== DODOMA ====================
            [
                'name' => 'Dodoma Secondary School',
                'region_id' => 3,
                'location' => 'Uhuru Avenue, Dodoma',
                'category_id' => 1,
                'type_id' => 1,
                'gender_id' => 3,
                'level_id' => 3,
                'levels' => [3, 4],
                'a_level_combinations' => ['PCM', 'PCB', 'EGM', 'CBG', 'HGL', 'HGK', 'PCoM'],
            ],
            [
                'name' => 'Msalato Girls Secondary School',
                'region_id' => 3,
                'location' => 'Msalato, Dodoma',
                'category_id' => 1,
                'type_id' => 2,
                'gender_id' => 2,
                'level_id' => 3,
                'levels' => [3],
            ],
            [
                'name' => 'Kizota Secondary School',
                'region_id' => 3,
                'location' => 'Kizota, Dodoma',
                'category_id' => 1,
                'type_id' => 1,
                'gender_id' => 3,
                'level_id' => 3,
                'levels' => [3],
            ],
            [
                'name' => 'Chamwino Primary School',
                'region_id' => 3,
                'location' => 'Chamwino, Dodoma',
                'category_id' => 1,
                'type_id' => 1,
                'gender_id' => 3,
                'level_id' => 2,
                'levels' => [2],
            ],
            [
                'name' => 'Fountain Gate Primary School',
                'region_id' => 3,
                'location' => 'Area C, Dodoma',
                'category_id' => 2,
                'type_id' => 1,
                'gender_id' => 3,
                'level_id' => 2,
                'levels' => [2],
            ],

            // ==================== ARUSHA ====================
            [
                'name' => 'Ilboru Secondary School',
                'region_id' => 1,
                'location' => 'Ilboru, Arusha',
                'category_id' => 1,
                'type_id' => 2,
                'gender_id' => 1,
                'level_id' => 3,
                'levels' => [3, 4],
                // combinations not verified — leave empty
            ],
            [
                'name' => 'Makumira Secondary School',
                'region_id' => 1,
                'location' => 'Makumira, Arusha',
                'category_id' => 1,
                'type_id' => 2,
                'gender_id' => 3,
                'level_id' => 3,
                'levels' => [3],
            ],
            [
                'name' => 'Arusha Secondary School',
                'region_id' => 1,
                'location' => 'Kaloleni, Arusha',
                'category_id' => 1,
                'type_id' => 1,
                'gender_id' => 3,
                'level_id' => 3,
                'levels' => [3],
                'phone' => '+255 27 254 8899',
            ],
            [
                'name' => 'Canossa Nursery School',
                'region_id' => 1,
                'location' => 'Themi, Arusha',
                'category_id' => 2,
                'type_id' => 1,
                'gender_id' => 3,
                'level_id' => 1,
                'levels' => [1],
            ],
            [
                'name' => 'St. Theresia Primary School',
                'region_id' => 1,
                'location' => 'Sakina, Arusha',
                'category_id' => 2,
                'type_id' => 1,
                'gender_id' => 3,
                'level_id' => 2,
                'levels' => [2],
            ],

            // ==================== DAR ES SALAAM ====================
            [
                'name' => 'Shaaban Robert Secondary School',
                'region_id' => 2,
                'location' => 'Upanga, Dar es Salaam',
                'category_id' => 2,
                'type_id' => 1,
                'gender_id' => 3,
                'level_id' => 3,
                'levels' => [3],
                'phone' => '+255 22 211 4903',
                'en_description' => 'Established in 1963. A well-known private secondary school in Upanga East, Dar es Salaam.',
                'sw_description' => 'Ilianzishwa mwaka 1963. Shule ya sekondari ya binafsi inayojulikana sana iliyoko Upanga Mashariki, Dar es Salaam.',
                'o_level_subjects' => [
                    'Civics', 'Kiswahili', 'English', 'Mathematics', 'Biology',
                    'Geography', 'Physics', 'Chemistry', 'Bookkeeping',
                    'Commerce', 'Information and Computer Studies', 'History',
                ],
            ],
            [
                'name' => 'Loyola High School',
                'region_id' => 2,
                'location' => 'Mabibo-Farasi, Dar es Salaam',
                'category_id' => 2,
                'type_id' => 1,
                'gender_id' => 3,
                'level_id' => 4,
                'levels' => [3, 4],
                'phone' => '+255 22 244 8602',
                'en_description' => 'A private Catholic secondary school located at Mabibo-Farasi, offering both O-level and A-level.',
                'sw_description' => 'Shule ya sekondari ya Kikatoliki ya binafsi iliyoko Mabibo-Farasi, inayotoa elimu ya Kidato cha 1-4 na Kidato cha 5-6.',
                'a_level_combinations' => ['CBG', 'ECA', 'EGM', 'HGE', 'HGK', 'HGL', 'HKL', 'PCB', 'PCM', 'PMC', 'PGM'],
            ],
            [
                'name' => 'Azania Secondary School',
                'region_id' => 2,
                'location' => 'Kariakoo, Dar es Salaam',
                'category_id' => 1,
                'type_id' => 1,
                'gender_id' => 1,
                'level_id' => 3,
                'levels' => [3, 4],
                'a_level_combinations' => ['ECA', 'PCB', 'PCM', 'EGM'],
            ],
            [
                'name' => 'Mbezi Beach Secondary School',
                'region_id' => 2,
                'location' => 'Mbezi Beach, Dar es Salaam',
                'category_id' => 2,
                'type_id' => 1,
                'gender_id' => 3,
                'level_id' => 3,
                'levels' => [3, 4],
                'phone' => '+255 22 262 7600',
                'a_level_combinations' => ['PCM', 'PCB', 'EGM', 'CBG', 'HGL', 'HGK', 'HKL', 'ECA', 'HGE'],
            ],
            [
                'name' => 'Feza Boys Secondary School',
                'region_id' => 2,
                'location' => 'Kijitonyama, Dar es Salaam',
                'category_id' => 2,
                'type_id' => 2,
                'gender_id' => 1,
                'level_id' => 4,
                'levels' => [3, 4],
                'a_level_combinations' => ['PCM', 'PCB', 'EGM', 'HGE', 'PGM'],
            ],
            [
                'name' => 'Tumaini Nursery School',
                'region_id' => 2,
                'location' => 'Kinondoni, Dar es Salaam',
                'category_id' => 2,
                'type_id' => 1,
                'gender_id' => 3,
                'level_id' => 1,
                'levels' => [1],
            ],
            [
                'name' => 'Mlimani Primary School',
                'region_id' => 2,
                'location' => 'Mlimani City, Dar es Salaam',
                'category_id' => 2,
                'type_id' => 1,
                'gender_id' => 3,
                'level_id' => 2,
                'levels' => [2],
            ],
        ];

        // Map combination code → exact subject name_en
        $combinationMap = [
            'PCM'  => 'PCM - Physics, Chemistry, Mathematics',
            'PCB'  => 'PCB - Physics, Chemistry, Biology',
            'PGM'  => 'PGM - Physics, Geography, Mathematics',
            'CBA'  => 'CBA - Chemistry, Biology, Agriculture',
            'CBG'  => 'CBG - Chemistry, Biology, Geography',
            'PMC'  => 'PMC - Physics, Mathematics, Computer Science',
            'PCoM' => 'PCoM - Physics, Computer Science, Mathematics',
            'HGL'  => 'HGL - History, Geography, Language',
            'HKL'  => 'HKL - History, Kiswahili, Literature',
            'HGK'  => 'HGK - History, Geography, Kiswahili',
            'HGE'  => 'HGE - History, Geography, Economics',
            'EGM'  => 'EGM - Economics, Geography, Mathematics',
            'ECA'  => 'ECA - Economics, Commerce, Accountancy',
        ];

        foreach ($schools as $school) {
            $levels         = $school['levels'];
            $oLevelSubjects = $school['o_level_subjects'] ?? null;
            $aLevelCombos   = $school['a_level_combinations'] ?? null;

            unset(
                $school['levels'],
                $school['o_level_subjects'],
                $school['a_level_combinations']
            );

            $slug = Str::slug($school['name']);

            DB::table('schools')->updateOrInsert(
                ['slug' => $slug],
                array_merge($school, [
                    'slug' => $slug,
                    'uuid' => Str::uuid()->toString(),
                    'deleted_at' => null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ])
            );

            $schoolId = DB::table('schools')->where('slug', $slug)->value('id');

            foreach ($levels as $levelId) {
                DB::table('school_levels')->updateOrInsert(
                    ['school_id' => $schoolId, 'level_id' => $levelId],
                    ['created_at' => now(), 'updated_at' => now()]
                );
            }

            if ($oLevelSubjects && in_array(3, $levels)) {
                foreach ($oLevelSubjects as $subjectName) {
                    $subjectId = DB::table('subjects')
                        ->where('name_en', $subjectName)
                        ->value('id');

                    if ($subjectId) {
                        DB::table('school_subjects')->updateOrInsert(
                            ['school_id' => $schoolId, 'level_id' => 3, 'subject_id' => $subjectId],
                            ['created_at' => now(), 'updated_at' => now()]
                        );
                    }
                }
            }

            if ($aLevelCombos && in_array(4, $levels)) {
                foreach ($aLevelCombos as $code) {
                    if (!isset($combinationMap[$code])) {
                        continue;
                    }

                    $subjectId = DB::table('subjects')
                        ->where('name_en', $combinationMap[$code])
                        ->value('id');

                    if ($subjectId) {
                        DB::table('school_subjects')->updateOrInsert(
                            ['school_id' => $schoolId, 'level_id' => 4, 'subject_id' => $subjectId],
                            ['created_at' => now(), 'updated_at' => now()]
                        );
                    }
                }

                $gsId = DB::table('subjects')
                    ->where('name_en', 'General Studies')
                    ->value('id');

                if ($gsId) {
                    DB::table('school_subjects')->updateOrInsert(
                        ['school_id' => $schoolId, 'level_id' => 4, 'subject_id' => $gsId],
                        ['created_at' => now(), 'updated_at' => now()]
                    );
                }
            }
        }
    }
}