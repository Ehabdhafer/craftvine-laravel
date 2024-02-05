<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/getcart', [CartController::class, 'getcart']);
    Route::post('/postcart', [CartController::class, 'postcart']);
    Route::delete('/deletecart/{id}', [CartController::class, 'deletecart']);
    Route::delete('/deleteall', [CartController::class, 'deleteall']);
});
