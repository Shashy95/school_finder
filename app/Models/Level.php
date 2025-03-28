<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    //
    protected $guarded = ['id'];

    public function schools()
    {
        return $this->hasMany(School::class);
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'level_subject');
    }
}
