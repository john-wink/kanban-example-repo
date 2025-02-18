<?php

declare(strict_types=1);

namespace App\Traits;

use Illuminate\Support\Str;

trait HasIdUuid
{
    public static function bootHasIdUuid()
    {
        static::creating(function ($model) {
            $model->id ??= Str::uuid7()->toString();
        });
    }

    public function getIncrementing()
    {
        return false;
    }

    // Helps the application specify the field type in the database
    public function getKeyType()
    {
        return 'string';
    }

    public function getKeyName()
    {
        return 'id';
    }
}
