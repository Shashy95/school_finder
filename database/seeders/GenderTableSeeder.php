<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GenderTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
       $genders=[
            ['id' => 1, 'name_en' => 'Boys', 'name_sw' => 'Wavulana'],
            ['id' => 2, 'name_en' => 'Girls', 'name_sw' => 'Wasichana'],
            ['id' => 3, 'name_en' => 'Co-education', 'name_sw' => 'Wavulana na Wasichana'],
        ];

        DB::table('genders')->upsert($genders, ['id'], ['name_en', 'name_sw']);
    }
}
