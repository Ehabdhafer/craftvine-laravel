<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use App\Models\products;
use Illuminate\Support\Facades\Log;
use Kreait\Firebase\Factory;

class ProductsController extends Controller
{
    function addproduct(Request $req)
    {
        try {
            $factory = (new Factory)->withServiceAccount('C:\\xampp\\htdocs\\PHP files\\Craftvine\\server\\resources\\credentials\\firebase_credentials.json');
            $storage = $factory->createStorage();

            $bucket = $storage->getBucket();

            $imageData = file_get_contents($req->file('product_image'));

            $originalFilename = $req->file('product_image')->getClientOriginalName();

            $object = $bucket->upload($imageData, [
                'name' =>  uniqid() . '_' . $originalFilename,
            ]);

            $imageUrl = 'https://firebasestorage.googleapis.com/v0/b/' . $bucket->name() . '/o/' . $object->name() . '?alt=media';

            products::create([
                'product_name' => $req->product_name,
                'category' => $req->category,
                'price' => $req->price,
                'rating' => $req->rating,
                'description' => $req->description,
                'quantity' => $req->quantity,
                'discount_percentage' => $req->discount_percentage,
                'product_image' => $imageUrl,
            ]);

            return response()->json(['message' => 'Product Created Successfully'], 201);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function getallproduct()
    {
        try {
            $products = products::getallproduct();
            return response()->json($products, 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function getproductid($id)
    {
        try {
            $result = products::getproductid($id);
            return response()->json($result, 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function getdiscount($discount)
    {
        try {
            $result = products::getdiscount($discount);
            return response()->json($result, 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function getcategory($category)
    {
        try {
            $result = products::getcategory($category);
            return response()->json($result, 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function getbest()
    {
        try {
            return products::getbest();
        } catch (Exception $e) {
            Log::error('Exception' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function deleteproduct(Request $req)
    {
        try {
            products::deleteproduct($req->product_id);
            return response()->json(['message' => 'Product Deleted Successfully'], 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
