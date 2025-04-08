<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Subject extends Model
{
    //
    protected $guarded = ['id'];

    public function levels()
    {
        return $this->belongsToMany(Level::class, 'school_subjects');
    }

    public function schools(): BelongsToMany
    {
        return $this->belongsToMany(School::class, 'school_subjects')
                   ->withPivot('level_id')
                   ->withTimestamps();
    }
}
