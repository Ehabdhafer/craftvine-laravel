<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Model;

class contact extends Model
{
    protected $table = 'contact_messages';
    protected $primaryKey = 'message_id';
    protected $fillable = ['name', 'email', 'message', 'is_deleted'];
    public $timestamps = false;


    protected static function postcontact($name, $email, $message)
    {
        try {
            return self::create(['name' => $name, 'email' => $email, 'message' => $message]);
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function getcontact()
    {
        try {
            return self::where('is_deleted', false)->get();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function deletecontact($id)
    {
        try {
            return self::where('message_id', $id)->update(['is_deleted' => true]);
        } catch (Exception $e) {
            throw $e;
        }
    }
}
