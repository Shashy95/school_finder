<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RegionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $regions=[
            ['id' => 1, 'name' => 'ARUSHA'],
            ['id' => 2, 'name' => 'DAR ES SALAAM'],
            ['id' => 3, 'name' => 'DODOMA'],
            ['id' => 4, 'name' => 'GEITA'],
            ['id' => 5, 'name' => 'IRINGA'],
            ['id' => 6, 'name' => 'KAGERA'],
            ['id' => 7, 'name' => 'KATAVI'],
            ['id' => 8, 'name' => 'KIGOMA'],
            ['id' => 9, 'name' => 'KILIMANJARO'],
            ['id' => 10, 'name' => 'LINDI'],
            ['id' => 11, 'name' => 'MBEYA'],
            ['id' => 12, 'name' => 'MANYARA'],
            ['id' => 13, 'name' => 'MOROGORO'],
            ['id' => 14, 'name' => 'MWANZA'],
            ['id' => 15, 'name' => 'MARA'],
            ['id' => 16, 'name' => 'NJOMBE'],
            ['id' => 17, 'name' => 'PWANI'],
            ['id' => 18, 'name' => 'RUKWA'],
            ['id' => 19, 'name' => 'RUVUMA'],
            ['id' => 20, 'name' => 'SINGIDA'],
            ['id' => 21, 'name' => 'SHINYANGA'],
            ['id' => 22, 'name' => 'SONGWE'],
            ['id' => 23, 'name' => 'SIMIYU'],
            ['id' => 24, 'name' => 'TABORA'],
            ['id' => 25, 'name' => 'TANGA'],
            ['id' => 26, 'name' => 'ZANZIBAR'],
        ];

        DB::table('regions')->upsert($regions, ['id'], ['name']);
    }
}
