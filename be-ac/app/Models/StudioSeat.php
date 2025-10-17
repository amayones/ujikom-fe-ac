<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudioSeat extends Model
{
    protected $fillable = [
        'studio_id',
        'seat_number',
        'row',
        'column',
        'type',
        'status',
    ];

    public function studio()
    {
        return $this->belongsTo(Studio::class);
    }

    public function scheduleSeats()
    {
        return $this->hasMany(ScheduleSeat::class);
    }
}