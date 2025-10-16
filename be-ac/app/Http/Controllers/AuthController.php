<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends BaseController
{
    public function register(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'password_confirmation' => 'required|same:password'
            ]);

            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => 'customer'
            ]);

            return $this->success($user, 'Registrasi berhasil', 201);
        } catch (ValidationException $e) {
            return $this->error('Validasi gagal', 422, $e->errors());
        } catch (\Exception $e) {
            return $this->error('Registrasi gagal: ' . $e->getMessage(), 500);
        }
    }

    public function login(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'email' => 'required|email',
                'password' => 'required'
            ]);

            if (!Auth::attempt($validated)) {
                return $this->error('Email atau password salah', 401);
            }

            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return $this->success([
                'user' => $user,
                'token' => $token,
                'token_type' => 'Bearer'
            ], 'Login berhasil');
        } catch (ValidationException $e) {
            return $this->error('Validasi gagal', 422, $e->errors());
        } catch (\Exception $e) {
            return $this->error('Login gagal: ' . $e->getMessage(), 500);
        }
    }

    public function logout(Request $request): JsonResponse
    {
        try {
            $request->user()->currentAccessToken()->delete();
            return $this->success(null, 'Logout berhasil');
        } catch (\Exception $e) {
            return $this->error('Logout gagal: ' . $e->getMessage(), 500);
        }
    }

    public function me(Request $request): JsonResponse
    {
        return $this->success($request->user(), 'Data user berhasil diambil');
    }
}
