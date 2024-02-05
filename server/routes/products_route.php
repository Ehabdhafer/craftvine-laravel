<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductsController;


Route::post('/addproduct', [ProductsController::class, 'addproduct']);
Route::get('/All_products', [ProductsController::class, 'getallproduct']);
Route::get('/Get_Product_By_Id/{id}', [ProductsController::class, 'getproductid']);
Route::get('/getdiscount/{discount}', [ProductsController::class, 'getdiscount']);
Route::get('/getcategory/{category}', [ProductsController::class, 'getcategory']);
Route::get('/getbest', [ProductsController::class, 'getbest']);
Route::put('/deleteproduct', [ProductsController::class, 'deleteproduct']);
