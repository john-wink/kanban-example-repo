<?php

declare(strict_types=1);

namespace App\Enums;

use App\Traits\Enum\EnumJsonSerializableTrait;
use Filament\Support\Colors\Color;
use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasIcon;
use Filament\Support\Contracts\HasLabel;
use Heloufir\FilamentKanban\Interfaces\KanbanStatusModel;
use Heloufir\FilamentKanban\ValueObjects\KanbanStatus;
use Spatie\Color\Rgb;

enum StatusEnum: string implements HasColor, HasIcon, HasLabel, KanbanStatusModel
{
    use EnumJsonSerializableTrait;

    case SALE = 'sale';
    case CLEARING = 'clearing';
    case FINANCING_DEPARTMENT = 'financing';
    case BANK = 'bank';
    case WON = 'won';

    public const DEFAULT = self::SALE;

    public static function default(): static
    {
        return self::DEFAULT;
    }

    public function getLabel(): ?string
    {
        return match ($this) {
            self::SALE => 'Verkaufsphase',
            self::CLEARING => 'Clearing',
            self::FINANCING_DEPARTMENT => 'Finanzierungsabteilung',
            self::BANK => 'Bank',
            self::WON => 'Gewonnen',
        };
    }

    public function getColor(): string|array|null
    {
        return match ($this) {

            self::SALE => Color::Yellow,
            self::CLEARING => Color::Blue,
            self::FINANCING_DEPARTMENT => Color::Cyan,
            self::BANK => Color::Emerald,
            self::WON => Color::Green,
        };
    }

    public function getIcon(): ?string
    {
        return match ($this) {
            self::SALE => 'heroicon-o-sparkles',
            self::CLEARING => 'heroicon-o-scale',
            self::FINANCING_DEPARTMENT => 'heroicon-o-scale',
            self::BANK => 'heroicon-o-building-library',
            self::WON => 'heroicon-o-banknotes',
        };
    }

    public function toStatus(): KanbanStatus
    {
        return KanbanStatus::make()
            ->id($this->value)
            ->title($this->getLabel())
            ->icon($this->getIcon())
            ->color((string) Rgb::fromString('rgb('.(is_array($this->getColor()) ? $this->getColor()[500] : $this->getColor()).')')->toHex());
    }
}
