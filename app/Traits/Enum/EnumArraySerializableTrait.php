<?php

declare(strict_types=1);

namespace App\Traits\Enum;

trait EnumArraySerializableTrait
{
    use EnumNamesTrait;
    use EnumValuesTrait;

    /**
     * @return array<string,string>
     */
    public static function array(): array
    {
        return array_combine(static::names(), static::values());
    }
}
