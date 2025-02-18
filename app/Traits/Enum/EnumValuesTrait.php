<?php

declare(strict_types=1);

namespace App\Traits\Enum;

trait EnumValuesTrait
{
    // abstract public static function cases(): array;

    /**
     * @return array<string>
     */
    public static function values(): array
    {
        return array_map(fn (mixed $enum) => $enum->value, static::cases());
    }
}
