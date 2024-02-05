<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WishlistController;



Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/postfav', [WishlistController::class, 'postfav']);
    Route::get('/getfav', [WishlistController::class, 'getfav']);
});
