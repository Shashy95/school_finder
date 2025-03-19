<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
    //
    protected $guarded = ['id'];

    public function schools()
    {
        return $this->hasMany(School::class);
    }
}
