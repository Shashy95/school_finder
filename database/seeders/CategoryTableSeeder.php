<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $categories=[
            ['id' => 1, 'name_en' => 'Public School', 'name_sw' => 'Shule ya Serikali'],
            ['id' => 2, 'name_en' => 'Private School', 'name_sw' => 'Shule ya Binafsi'],
        ];

        DB::table('categories')->upsert($categories, ['id'], ['name_en', 'name_sw']);
    }
}
