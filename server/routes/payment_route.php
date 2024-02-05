<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaymentController;



Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/postpayment', [PaymentController::class, 'postpayment']);
});
