<?php

namespace App\Http\Controllers;

use App\Models\contact;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    function postcontact(Request $req)
    {
        try {
            contact::postcontact(
                $req->input('name'),
                $req->input('email'),
                $req->input('message')
            );
            return response()->json(['message' => 'Sent Successfully'], 201);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function getcontact()
    {
        try {
            return contact::getcontact();
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }

    function deletecontact(Request $req)
    {
        try {
            $validate = ['message_id' => 'required'];
            $req->validate($validate);

            contact::deletecontact($req->message_id);
            return response()->json(['message' => 'deleted successfully'], 200);
        } catch (Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Internal Server Error', 'message' => $e->getMessage()], 500);
        }
    }
}
