<?php

namespace App\Models;

use App\Helpers\SecondsToTime;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use RichanFongdasen\EloquentBlameable\BlameableTrait;

class Track extends Model
{
    use HasFactory, HasUuids, Sluggable, BlameableTrait;

    public function sluggable(): array
    {
        return ['slug' => ['source' => 'title']];
    }

    protected $fillable = [
        'title',
        'length',
        'order',
        'album_id',
    ];

    public function album(): BelongsTo
    {
        return $this->belongsTo(Album::class);
    }

    public function scopeOrderedAlbum(Builder $query, string $albumId): Builder
    {
        return $query->orderBy('order')->where('album_id', $albumId);
    }

    public function lengthInMinutes(): string
    {
        $converter = new SecondsToTime;

        return $converter($this->length);
    }
}
