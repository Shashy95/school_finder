<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('school_subject', function (Blueprint $table) {
            $table->id(); // Auto-incrementing ID
            $table->foreignId('school_id')->constrained()->onDelete('cascade'); // Foreign key to schools table
            $table->foreignId('subject_id')->constrained()->onDelete('cascade'); // Foreign key to subjects table
            $table->timestamps(); // Created at and updated at timestamps
        });
    }

    public function down()
    {
        Schema::dropIfExists('school_subject');
    }
};
