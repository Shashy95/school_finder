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
         Schema::create('schools', function (Blueprint $table) {
             $table->id(); 
             $table->uuid('uuid')->unique(); 
             $table->string('slug')->unique(); 
             $table->string('name'); 
             $table->foreignId('region_id')->nullable()->constrained('regions')->onDelete('set null');
             $table->string('location'); 
             $table->foreignId('category_id')->nullable()->constrained('categories')->onDelete('set null'); 
             $table->foreignId('type_id')->nullable()->constrained('types')->onDelete('set null'); 
             $table->foreignId('gender_id')->nullable()->constrained('genders')->onDelete('set null'); 
             $table->foreignId('level_id')->nullable()->constrained('levels')->onDelete('set null'); 
             $table->json('levels_with_subjects')->nullable(); 
             $table->text('en_description')->nullable();
             $table->text('sw_description')->nullable();
             $table->string('website')->nullable();
             $table->text('social_media_links')->nullable();
             $table->string('phone')->nullable(); 
             $table->string('email')->nullable(); 
             $table->softDeletes(); 
             $table->timestamps(); 
         });
     }
 
     public function down()
     {
         Schema::dropIfExists('schools');
     }
};
