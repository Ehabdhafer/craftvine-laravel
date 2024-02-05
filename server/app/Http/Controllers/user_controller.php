<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Exception;
use Illuminate\Support\Facades\Auth;
use Kreait\Firebase\Factory;



class user_controller extends Controller
{
    function register(Request $req)
    {
        try {
            if (User::checkemail($req->email)) {
                return response()->json(['message' => 'Email Already Exists'], 400);
            }
            $validate = [
                'username' => 'required|max:30',
                'email' => 'required|max:30',
                'password' => 'required|max:40',
                'phone' => 'required|max:10',
            ];
            $req->validate($validate);

            $user = User::register($req->username, $req->email, $req->password, $req->phone);

            $token = $user->createToken('token', ['*'], now()->addHours(12))->plainTextToken;
            return response()->json(['message' => 'User added Successfully', 'token' => $token], 201);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function login(Request $req)
    {
        try {
            $user = User::checkemail($req->email);
            if (!$user || !User::checkpass($req->password, $user->password)) {
                return response()->json(['message' => 'Invalid Email or Password'], 400);
            }
            $user->tokens->each->delete();

            $token = $user->createToken('token', ['*'], now()->addHours(12))->plainTextToken;
            return response()->json(['message' => 'Loggedin Successfully', 'token' => $token], 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function loginGoogle(Request $req)
    {
        try {
            $user = User::checkemail($req->email);
            if ($user) {
                $user->tokens->each->delete();

                $token = $user->createToken('token', ['*'], now()->addHours(12))->plainTextToken;
                return response()->json(['message' => 'Loggedin Successfully', 'token' => $token], 200);
            } else {
                $register = User::loginGoogle($req->input('name'), $req->input('email'), $req->input('picture'));

                $token = $register->createToken('token', ['*'], now()->addHours(12))->plainTextToken;
                return response()->json(['message' => 'user added Successfully'], 201);
            }
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function getuser()
    {
        try {
            $user = Auth::user();
            return User::getuser($user->user_id);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function updateuser(Request $req)
    {
        try {
            $factory = (new Factory)->withServiceAccount('C:\xampp\htdocs\PHP files\Craftvine\server\resources\credentials\firebase_credentials.json');
            $storage = $factory->createStorage();
            $bucket = $storage->getBucket();

            $user = Auth::user();

            if ($req->hasFile('image_url')) {
                $imageData = file_get_contents($req->file('image_url'));

                $originalFilename = $req->file('image_url')->getClientOriginalName();

                $object = $bucket->upload($imageData, [
                    'name' =>  uniqid() . '_' . date('Y-m-d H:i:s') . $originalFilename,
                ]);

                $imageUrl = 'https://firebasestorage.googleapis.com/v0/b/' . $bucket->name() . '/o/' . $object->name() . '?alt=media';
            } else {
                $imageUrl = $user->image_url;
            }

            $updata = $req->only(['username', 'email', 'phone']);
            $view = User::updateuser($user->user_id, $updata, $imageUrl);

            return response()->json(['message' => 'User Updated Successfully', 'view' => $view], 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function getalluser()
    {
        try {
            return User::getalluser();
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function deleteuser(Request $req)
    {
        try {
            User::deleteuser($req->input('user_id'));
            return response()->json(['message' => 'User Deleted Successfully'], 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
