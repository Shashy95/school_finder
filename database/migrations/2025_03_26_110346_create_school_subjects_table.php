<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::dropIfExists('school_subject');

        Schema::create('school_subjects', function (Blueprint $table) {
            $table->foreignId('school_id')->constrained();
            $table->foreignId('level_id')->constrained(); // Subject is tied to a level
            $table->foreignId('subject_id')->constrained();
            $table->primary(['school_id', 'level_id', 'subject_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('school_subjects');
    }
};
