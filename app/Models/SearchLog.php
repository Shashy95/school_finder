<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class SearchLog extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'search_criteria',
        'school_id',
        'searched_by_ip',
    ];

    protected $casts = [
        'search_criteria' => 'array',  // Automatically convert JSON to array
    ];
}
