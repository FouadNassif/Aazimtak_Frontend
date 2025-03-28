<?php

namespace App\Http\Controllers;

use App\Models\WeddingImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class ImageUploadController extends Controller
{
    public function upload(Request $request)
    {
        try {
            // First check if file exists in request
            if (!$request->hasFile('image')) {
                throw ValidationException::withMessages([
                    'image' => ['No image file was provided']
                ]);
            }

            $file = $request->file('image');

            // Validate file
            $validator = validator($request->all(), [
                'image' => [
                    'required',
                    'file',
                    'image',
                    'mimes:jpeg,png,jpg,gif',
                    'max:2048',
                    'dimensions:min_width=100,min_height=100'
                ],
                'userId' => 'required|exists:users,id',
                'layout' => 'required|integer|min:1',
                'position' => 'required|integer|min:1'
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $userId = $request->input('userId');
            $layout = $request->input('layout');
            $position = $request->input('position');

            // Log the file details
            Log::info('Upload attempt', [
                'original_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getMimeType(),
                'size' => $file->getSize(),
                'user_id' => $userId
            ]);

            // Generate a unique filename
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
            
            // Ensure the directory exists
            $directory = 'wedding-images';
            if (!Storage::disk('public')->exists($directory)) {
                Storage::disk('public')->makeDirectory($directory);
            }

            // Store the file
            $path = $file->storeAs($directory, $filename, 'public');

            if (!$path) {
                Log::error('Failed to store file', [
                    'filename' => $filename,
                    'user_id' => $userId
                ]);
                throw new \Exception('Failed to store file');
            }

            // Create database record
            $image = WeddingImage::create([
                'user_id' => $userId,
                'path' => $path,
                'layout' => $layout,
                'position' => $position
            ]);

            Log::info('Image uploaded successfully', [
                'path' => $path,
                'image_id' => $image->id
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Image uploaded successfully',
                'image' => [
                    'path' => Storage::url($path)
                ]
            ]);

        } catch (ValidationException $e) {
            Log::error('Validation failed', [
                'errors' => $e->errors()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Upload failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload image: ' . $e->getMessage()
            ], 500);
        }
    }

    public function delete(Request $request, $id)
    {
        try {
            $image = WeddingImage::findOrFail($id);

            // Delete the file from storage
            if (Storage::disk('public')->exists($image->path)) {
                Storage::disk('public')->delete($image->path);
            }

            // Delete the database record
            $image->delete();

            return response()->json([
                'success' => true,
                'message' => 'Image deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete image: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getUserImages($userId)
    {
        try {
            $images = WeddingImage::where('user_id', $userId)
                ->orderBy('layout')
                ->orderBy('position')
                ->get()
                ->map(function ($image) {
                    return [
                        'id' => $image->id,
                        'path' => Storage::url($image->path),
                        'layout' => $image->layout,
                        'position' => $image->position
                    ];
                });

            return response()->json([
                'success' => true,
                'images' => $images
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch images: ' . $e->getMessage()
            ], 500);
        }
    }
} 