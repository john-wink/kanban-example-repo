<?php

use App\Enums\StatusEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('loans', function (Blueprint $table) {
            $table->uuid()->primary();
            $table->string('title');
            $table->enum('status', StatusEnum::values())->default(StatusEnum::default());
            $table->timestamp('deadline')->nullable();
            $table->foreignUuid('user_uuid')->constrained('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignUuid('financier_uuid')->constrained('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loans');
    }
};
