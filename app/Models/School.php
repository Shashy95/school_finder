<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class School extends Model
{
    //
    use SoftDeletes;
    
    protected $guarded = ['id'];


    protected $casts = [
        'levels_with_subjects' => 'array',
    ];

    public function region()
    {
        return $this->belongsTo(Region::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function type()
    {
        return $this->belongsTo(Type::class);
    }
    public function gender()
    {
        return $this->belongsTo(Gender::class);
    }

 // app/Models/School.php
public function levels()
{
    return $this->belongsToMany(Level::class, 'school_levels');
}

public function subjects()
{
    return $this->belongsToMany(Subject::class, 'school_subjects')
                ->withPivot('level_id')
                ->withTimestamps();
}

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->uuid = (string) Str::uuid(); // Generate a UUID when creating a new school
            $model->slug = Str::slug($model->name); // Generate a slug from the name
        });
    }

    // Optionally, you can create a method to update the slug if the name changes
    public function save(array $options = [])
    {
        if ($this->isDirty('name')) {
            $this->slug = Str::slug($this->name);
        }
        parent::save($options);
    }
}
