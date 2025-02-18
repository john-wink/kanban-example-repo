<?php

namespace App\Filament\Pages;

use Filament\Pages\Auth\Login;

class AdminLoginPage extends Login
{
    public function mount(): void
    {
        parent::mount();
        if (app()->isLocal()) {
            $this->form->fill([
                'email' => 'test@example.com',
                'password' => 'password',
            ]);
        }
    }
}
