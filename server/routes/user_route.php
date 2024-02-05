<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\user_controller;



Route::post('/register', [user_controller::class, 'register']);
Route::post('/login', [user_controller::class, 'login']);
Route::get('/getalluser', [user_controller::class, 'getalluser']);
Route::put('/deleteuser', [user_controller::class, 'deleteuser']);
Route::post('/loginGoogle', [user_controller::class, 'loginGoogle']);



Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/getuser', [user_controller::class, 'getuser']);
    Route::post('/updateuser', [user_controller::class, 'updateuser']);
});
