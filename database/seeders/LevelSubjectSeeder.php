<?php

namespace Database\Seeders;

use App\Models\Level;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Subject;


class levelSubjectSeeder extends Seeder
{
    public function run()
    {
        // Get all levels and subjects by name
        $levels = Level::pluck('id', 'name_en')->all();
        $subjects = Subject::pluck('id', 'name_en')->all();

        // Define all level-subject relationships
        $relationships = [
            /* ==================== */
            /* NURSERY (Chekechea) */
            /* ==================== */
            ['level' => 'Nursery', 'subject' => 'Language Activities'],
            ['level' => 'Nursery', 'subject' => 'Mathematical Activities'],
            ['level' => 'Nursery', 'subject' => 'Environmental Activities'],
            ['level' => 'Nursery', 'subject' => 'Creative Activities'],
            
            /* ==================== */
            /* PRIMARY (Msingi) */
            /* ==================== */
            // Core subjects
            ['level' => 'Primary', 'subject' => 'Mathematics'],
            ['level' => 'Primary', 'subject' => 'English'],
            ['level' => 'Primary', 'subject' => 'Kiswahili'],
            ['level' => 'Primary', 'subject' => 'Science'],
            ['level' => 'Primary', 'subject' => 'Social Studies'],
            ['level' => 'Primary', 'subject' => 'Civics'],
            
            // Additional primary subjects
            ['level' => 'Primary', 'subject' => 'Vocational Skills'],
            ['level' => 'Primary', 'subject' => 'Religious Education'],
            ['level' => 'Primary', 'subject' => 'Physical Education'],
            
            /* ==================== */
            /* O-level (Kidato 1-4) */
            /* ==================== */
            // Sciences
            ['level' => 'O-level', 'subject' => 'Mathematics'], // Continues from primary
            ['level' => 'O-level', 'subject' => 'Physics'],
            ['level' => 'O-level', 'subject' => 'Chemistry'],
            ['level' => 'O-level', 'subject' => 'Biology'],
            ['level' => 'O-level', 'subject' => 'Agricultural Science'],
            
            // Humanities
            ['level' => 'O-level', 'subject' => 'Geography'],
            ['level' => 'O-level', 'subject' => 'History'],
            ['level' => 'O-level', 'subject' => 'Civics'],
            ['level' => 'O-level', 'subject' => 'Islamic Studies'],
            ['level' => 'O-level', 'subject' => 'Christian Religious Education'],
            
            // Languages
            ['level' => 'O-level', 'subject' => 'English'],
            ['level' => 'O-level', 'subject' => 'Kiswahili'],
            ['level' => 'O-level', 'subject' => 'French'],
            ['level' => 'O-level', 'subject' => 'Arabic'],
            
            // Business/Technical
            ['level' => 'O-level', 'subject' => 'Commerce'],
            ['level' => 'O-level', 'subject' => 'Bookkeeping'],
            ['level' => 'O-level', 'subject' => 'Information and Computer Studies'],
            
            ['level' => 'O-level', 'subject' => 'Advanced Mathematics'],
            
            /* ==================== */
            /* A-level (Kidato 5-6) */
            /* ==================== */
            // Science Combinations
            ['level' => 'A-level', 'subject' => 'PCM - Physics, Chemistry, Mathematics'],
            ['level' => 'A-level', 'subject' => 'PCB - Physics, Chemistry, Biology'],
            ['level' => 'A-level', 'subject' => 'PGM - Physics, Geography, Mathematics'],
            ['level' => 'A-level', 'subject' => 'CBA - Chemistry, Biology, Agriculture'],
            
            // Arts Combinations
            ['level' => 'A-level', 'subject' => 'HGL - History, Geography, Language'],
            ['level' => 'A-level', 'subject' => 'ECA - Economics, Commerce, Accountancy'],
            ['level' => 'A-level', 'subject' => 'HKL - History, Kiswahili, Literature'],
            
            // Advanced Subjects (for all combinations)
      
            ['level' => 'A-level', 'subject' => 'General Studies']
        ];

        foreach ($relationships as $rel) {
            if (isset($levels[$rel['level']], $subjects[$rel['subject']])) {
                DB::table('level_subject')->updateOrInsert(
                    [
                        'level_id' => $levels[$rel['level']],
                        'subject_id' => $subjects[$rel['subject']]
                    ],
                    ['created_at' => now(), 'updated_at' => now()]
                );
            }
        }
    }
}