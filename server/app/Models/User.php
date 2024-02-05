<?php

namespace App\Models;

use Exception;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'users';
    protected $primaryKey = 'user_id';
    protected $fillable = [
        'user_role',
        'username',
        'email',
        'password',
        'phone',
        'is_deleted',
        'image_url'
    ];


    protected static function register($username, $email, $password, $phone)
    {
        try {
            $user_role = 'user';
            $user = self::create([
                'user_role' => $user_role, 'username' => $username,
                'email' => $email, 'password' => $password, 'phone' => $phone
            ]);
            return $user;
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function loginGoogle($username, $email, $image_url)
    {
        try {
            return self::create([
                'user_role' => 'user', 'username' => $username,
                'email' => $email, 'password' => 'no access',
                'phone' => '0000', 'image_url' => $image_url
            ]);
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function checkemail($email)
    {
        try {
            return self::where('email', $email)
                ->where('is_deleted', false)
                ->first();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function checkpass($password, $hashedpass)
    {
        try {
            return Hash::check($password, $hashedpass);
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function getuser($id)
    {
        try {
            return self::where('is_deleted', false)
                ->findorfail($id);
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function updateuser($id, $data, $image_url)
    {
        try {
            $us = self::findorfail($id);
            $us->update(array_merge($data, ['image_url' => $image_url]));
            return $us;
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function getalluser()
    {
        try {
            return self::where('is_deleted', false)
                ->get();
        } catch (Exception $e) {
            throw $e;
        }
    }

    protected static function deleteuser($id)
    {
        try {
            return self::findorfail($id)
                ->update(['is_deleted' => true]);
        } catch (Exception $e) {
            throw $e;
        }
    }
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
