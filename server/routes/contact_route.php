<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;


Route::post('/postcontact', [ContactController::class, 'postcontact']);
Route::get('/getcontact', [ContactController::class, 'getcontact']);
Route::put('/deletecontact', [ContactController::class, 'deletecontact']);
