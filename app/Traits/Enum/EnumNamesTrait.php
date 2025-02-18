<?php

declare(strict_types=1);

namespace App\Traits\Enum;

trait EnumNamesTrait
{
    /**
     * @return array<int,string>
     */
    public static function names(): array
    {
        return array_map(fn ($enum) => $enum->name, static::cases());
    }
}
