<?php

namespace App\Models;

use App\Enums\StatusEnum;
use App\Traits\HasUuid;
use Heloufir\FilamentKanban\Interfaces\KanbanRecordModel;
use Heloufir\FilamentKanban\ValueObjects\KanbanRecord;
use Heloufir\FilamentKanban\ValueObjects\KanbanResources;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Loan extends Model implements KanbanRecordModel
{
    /** @use HasFactory<\Database\Factories\LoanFactory> */
    use HasFactory;

    use HasUuid;

    protected $fillable = [
        'title',
        'status',
        'deadline',
        'sort',
        'user_uuid',
        'financier_uuid',
    ];

    public $casts = [
        'status' => StatusEnum::class,
        'deadline' => 'datetime',
    ];

    public function realestates()
    {
        return $this->hasMany(RealEstate::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id');
    }

    public function financier(): BelongsTo
    {
        return $this->belongsTo(User::class, 'financier_uuid');
    }

    public function toRecord(): KanbanRecord
    {
        return KanbanRecord::make()
            ->editable(true)
            ->viewable(true)
            ->deletable(true)
            ->sortable(true)
            ->id($this->uuid)
            ->title(\Illuminate\Support\Number::currency($this->realestates->sum(fn ($o) => $o->price), 'EUR'))
            ->description($this->title)
            ->deadline($this->deadline)
            ->progress(rand(0, 100))
            ->assignees($this->assignes())
            ->status($this->status->toStatus());
    }

    public function assignes(): ?KanbanResources
    {
        $users = collect([$this->financier, $this->user])
            ->filter(fn ($i) => $i !== null);
        if (count($users) > 0) {
            return KanbanResources::make($users);
        }

        return null;
    }

    public function statusColumn(): string
    {
        return 'status';
    }

    public function sortColumn(): string
    {
        return 'sort';
    }
}
