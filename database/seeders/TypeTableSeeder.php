<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $types=[
            ['id' => 1, 'name_en' => 'Day', 'name_sw' => 'Kutwa'],
            ['id' => 2, 'name_en' => 'Boarding', 'name_sw' => 'Bweni'],
            ['id' => 3, 'name_en' => 'Day and Boarding', 'name_sw' => 'Kutwa na Bweni'],
        ];
        
        DB::table('types')->upsert($types, ['id'], ['name_en', 'name_sw']);
    }
}
