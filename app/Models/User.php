<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Traits\HasIdUuid;
use Filament\Models\Contracts\FilamentUser;
use Filament\Models\Contracts\HasAvatar;
use Filament\Models\Contracts\HasName;
use Filament\Panel;
use Heloufir\FilamentKanban\Interfaces\KanbanResourceModel;
use Heloufir\FilamentKanban\ValueObjects\KanbanResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements FilamentUser, HasAvatar, HasName, KanbanResourceModel
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    use HasIdUuid;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return true;
    }

    public function getFilamentAvatarUrl(): ?string
    {
        return 'https://ui-avatars.com/api/?name='.str($this->name)->replace(' ', '+');
    }

    public function getFilamentName(): string
    {
        return $this->name;
    }

    public function toResource(): KanbanResource
    {
        return KanbanResource::make()
            ->id($this->id)
            ->name($this->name)
            ->avatar($this->getFilamentAvatarUrl());
    }

    public function loan()
    {
        return $this->hasMany(Loan::class);
    }

    public function realestate()
    {
        return $this->hasMany(RealEstate::class);
    }
}
