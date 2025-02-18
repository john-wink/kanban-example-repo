<?php

declare(strict_types=1);

namespace App\Traits\Enum;

trait EnumJsonSerializableTrait
{
    use EnumArraySerializableTrait;

    public static function jsonSerialize(): string|false
    {
        return json_encode(static::array());
    }
}
