<?php

namespace App\Filament\Resources\LoanResource\Pages;

use App\Enums\StatusEnum;
use App\Filament\Resources\LoanResource;
use App\Models\Loan;
use Heloufir\FilamentKanban\Filament\KanbanBoard;
use Heloufir\FilamentKanban\ValueObjects\KanbanStatuses;
use Illuminate\Database\Eloquent\Builder;

class Kanban extends KanbanBoard
{
    protected static string $resource = LoanResource::class;

    public static function getNavigationParentItem(): ?string
    {
        return __('Loans');
    }

    public function recordInfolist(): array
    {
        return LoanResource::infolistFields();
    }

    public function recordForm(): array
    {
        return LoanResource::formFields();
    }

    public function status(): array
    {
        return [
            StatusEnum::SALE,
            StatusEnum::CLEARING,
            StatusEnum::FINANCING_DEPARTMENT,
            StatusEnum::BANK,
            StatusEnum::WON,
        ];
    }

    public function getStatuses(): KanbanStatuses
    {
        return KanbanStatuses::make($this->status());
    }

    public function model(): string
    {
        return Loan::class;
    }

    public function query(Builder $query): Builder
    {
        return Loan::with([
            'user',
            'financier',
            'realestates',
        ])
            ->whereIn('status', $this->status());
    }

    protected function getHeaderActions(): array
    {
        return [
            $this->addAction()
        ];
    }

    protected function mutateFormDataAfterAddAction(array $data): array
    {
        $data = parent::mutateFormDataAfterAddAction($data);
        $data['user_uuid'] = auth()->id();
        return $data;
    }
}
