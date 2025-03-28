<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WeddingImage extends Model
{
    protected $fillable = [
        'user_id',
        'path',
        'layout',
        'position'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
} 