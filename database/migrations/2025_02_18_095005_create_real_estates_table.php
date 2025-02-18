<?php

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
        Schema::create('real_estates', function (Blueprint $table) {
            $table->uuid()->primary();
            $table->string('title');
            $table->float('price');
            $table->foreignUuid('user_uuid')->constrained('users')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignUuid('realestate_uuid')->nullable()->constrained('real_estates', 'uuid')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreignUuid('loan_uuid')->nullable()->constrained('loans', 'uuid')->cascadeOnDelete()->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('real_estates');
    }
};
