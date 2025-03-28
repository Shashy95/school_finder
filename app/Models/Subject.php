<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    //
    protected $guarded = ['id'];

    public function levels()
    {
        return $this->belongsToMany(Level::class, 'level_subject');
    }
}
