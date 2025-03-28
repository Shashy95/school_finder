<?php
// database/migrations/YYYY_MM_DD_create_level_subject_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLevelSubjectTable extends Migration
{
    public function up()
    {
        Schema::dropIfExists('level_subject');

        Schema::create('level_subject', function (Blueprint $table) {
            $table->unsignedBigInteger('level_id');
            $table->unsignedBigInteger('subject_id');
            $table->timestamps();

            // Composite primary key
            $table->primary(['level_id', 'subject_id']);

            // Foreign keys
            $table->foreign('level_id')
                  ->references('id')
                  ->on('levels')
                  ->onDelete('cascade');

            $table->foreign('subject_id')
                  ->references('id')
                  ->on('subjects')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('level_subject');
    }
}