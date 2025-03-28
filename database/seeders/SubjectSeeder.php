<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubjectSeeder extends Seeder
{
    public function run()
    {
        $subjects = [
            /* ==================== */
            /* NURSERY SUBJECTS */
            /* ==================== */
            [
                'name_en' => 'Language Activities',
                'name_sw' => 'Shughuli za Lugha'
            ],
            [
                'name_en' => 'Mathematical Activities',
                'name_sw' => 'Shughuli za Hisabati'
            ],
            [
                'name_en' => 'Environmental Activities',
                'name_sw' => 'Shughuli za Mazingira'
            ],
            [
                'name_en' => 'Creative Activities',
                'name_sw' => 'Shughuli za Ubunifu'
            ],

            /* ==================== */
            /* PRIMARY SUBJECTS (Std 1-7) */
            /* ==================== */
            [
                'name_en' => 'Mathematics',
                'name_sw' => 'Hisabati'
            ],
            [
                'name_en' => 'English',
                'name_sw' => 'Kiingereza'
            ],
            [
                'name_en' => 'Kiswahili',
                'name_sw' => 'Kiswahili'
            ],
            [
                'name_en' => 'Science',
                'name_sw' => 'Sayansi'
            ],
            [
                'name_en' => 'Social Studies',
                'name_sw' => 'Maarifa ya Jamii'
            ],
            [
                'name_en' => 'Civics',
                'name_sw' => 'Uraia'
            ],
            [
                'name_en' => 'Vocational Skills',
                'name_sw' => 'Stadi za Kazi'
            ],
            [
                'name_en' => 'Religious Education',
                'name_sw' => 'Elimu ya Dini'
            ],
            [
                'name_en' => 'Physical Education',
                'name_sw' => 'Mazoezi ya Michezo'
            ],

            /* ==================== */
            /* O-LEVEL SUBJECTS (Form 1-4) */
            /* ==================== */
            [
                'name_en' => 'Physics',
                'name_sw' => 'Fizikia'
            ],
            [
                'name_en' => 'Chemistry',
                'name_sw' => 'Kemia'
            ],
            [
                'name_en' => 'Biology',
                'name_sw' => 'Biolojia'
            ],
            [
                'name_en' => 'Agricultural Science',
                'name_sw' => 'Sayansi ya Kilimo'
            ],
            [
                'name_en' => 'Geography',
                'name_sw' => 'Jiografia'
            ],
            [
                'name_en' => 'History',
                'name_sw' => 'Historia'
            ],
            [
                'name_en' => 'Islamic Studies',
                'name_sw' => 'Elimu ya Kiislamu'
            ],
            [
                'name_en' => 'Christian Religious Education',
                'name_sw' => 'Elimu ya Dini ya Kikristo'
            ],
            [
                'name_en' => 'French',
                'name_sw' => 'Kifaransa'
            ],
            [
                'name_en' => 'Arabic',
                'name_sw' => 'Kiarabu'
            ],
            [
                'name_en' => 'Commerce',
                'name_sw' => 'Biashara'
            ],
            [
                'name_en' => 'Bookkeeping',
                'name_sw' => 'Uhasibu'
            ],
            [
                'name_en' => 'Information and Computer Studies',
                'name_sw' => 'Elimu ya Kompyuta'
            ],
           

            /* ==================== */
            /* A-LEVEL SUBJECTS (Form 5-6) */
            /* ==================== */
            // Core Subjects
            [
                'name_en' => 'Advanced Mathematics',
                'name_sw' => 'Advanced Mathematics'
            ],
            [
                'name_en' => 'General Studies',
                'name_sw' => 'General Studies'
            ],

            // Science Combinations
            [
                'name_en' => 'PCM - Physics, Chemistry, Mathematics',
                'name_sw' => 'PCM - Fizikia, Kemia, Hisabati'
            ],
            [
                'name_en' => 'PCB - Physics, Chemistry, Biology',
                'name_sw' => 'PCB - Fizikia, Kemia, Biolojia'
            ],
            [
                'name_en' => 'PGM - Physics, Geography, Mathematics',
                'name_sw' => 'PGM - Fizikia, Jiografia, Hisabati'
            ],
            [
                'name_en' => 'CBA - Chemistry, Biology, Agriculture',
                'name_sw' => 'CBA - Kemia, Biolojia, Kilimo'
            ],

            // Arts Combinations
            [
                'name_en' => 'HGL - History, Geography, Language',
                'name_sw' => 'HGL - Historia, Jiografia, Lugha'
            ],
            [
                'name_en' => 'ECA - Economics, Commerce, Accountancy',
                'name_sw' => 'ECA - Uchumi, Biashara, Uhasibu'
            ],
            [
                'name_en' => 'HKL - History, Kiswahili, Literature',
                'name_sw' => 'HKL - Historia, Kiswahili, Fasihi'
            ]
        ];

        foreach ($subjects as $subject) {
            DB::table('subjects')->updateOrInsert(
                ['name_en' => $subject['name_en']],
                $subject
            );
        }
    }
}