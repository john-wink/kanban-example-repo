<?php

namespace App\Filament\Resources;

use App\Enums\StatusEnum;
use App\Filament\Resources\LoanResource\Pages;
use App\Models\Loan;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Infolists\Components\TextEntry;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class LoanResource extends Resource
{
    protected static ?string $model = Loan::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function formFields()
    {
        return [
            Select::make('financier_uuid')
                ->relationship('financier', 'name'),
            TextInput::make('title'),
            Select::make('status')->options(StatusEnum::class),
            DateTimePicker::make('deadline'),
        ];
    }

    public static function infolistFields()
    {
        return [
            TextEntry::make('title'),
            TextEntry::make('status'),
            TextEntry::make('deadline')->datetime(),
        ];
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema(self::formFields());
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title'),
                TextColumn::make('status'),
                TextColumn::make('realestate.title'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListLoans::route('/'),
            'create' => Pages\CreateLoan::route('/create'),
            'edit' => Pages\EditLoan::route('/{record}/edit'),
        ];
    }
}
