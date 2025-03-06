<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LevelTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $levels=[
            ['id' => 1, 'name_en' => 'Nursery', 'name_sw' => 'Chekechea'],
            ['id' => 2, 'name_en' => 'Primary', 'name_sw' => 'Msingi'],
            ['id' => 3, 'name_en' => 'O-level', 'name_sw' => 'O-level'],
            ['id' => 4, 'name_en' => 'A-level', 'name_sw' => 'A-level'],
        ];

        DB::table('levels')->upsert($levels, ['id'], ['name_en', 'name_sw']);
    }
}
