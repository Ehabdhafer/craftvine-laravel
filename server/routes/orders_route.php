<?php

use App\Http\Controllers\OrdersController;
use Illuminate\Support\Facades\Route;



Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/postorder', [OrdersController::class, 'postorder']);
    Route::get('/getorder', [OrdersController::class, 'getorder']);
});


Route::get('/allorders', [OrdersController::class, 'allorders']);
