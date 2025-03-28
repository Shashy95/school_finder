<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

use SubjectAndLevelSubjectSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'test@example.com'], // Condition to check if the user exists (e.g., by email)
            [
                'name' => 'Test User',
                'password' => Hash::make('password'),
            ]
        );

        $this->call(CategoryTableSeeder::class);
        $this->call(LevelTableSeeder::class);
        $this->call(GenderTableSeeder::class);
        $this->call(TypeTableSeeder::class);
        $this->call(RegionsTableSeeder::class);
        $this->call(SubjectSeeder::class);
        $this->call(LevelSubjectSeeder::class);
    }
}
