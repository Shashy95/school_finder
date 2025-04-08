<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    //
    protected $guarded = ['id'];

    public function schools()
{
    return $this->belongsToMany(School::class, 'school_levels')
               ->withTimestamps();
}

    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'school_subjects');
    }
}
