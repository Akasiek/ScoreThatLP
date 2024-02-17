<?php

use App\Http\Controllers\AlbumController;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\TrackController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return "Hi!";
});

Route::middleware('auth:sanctum')->group(function () {
    Route::controller(AlbumController::class)->prefix('albums')->group(function () {
        Route::get('/', [AlbumController::class, 'index']);
        Route::post('/', [AlbumController::class, 'store']);
        Route::get('/{albumParam}', [AlbumController::class, 'show']);
        Route::put('/{albumParam}', [AlbumController::class, 'update']);
        Route::patch('/{albumParam}', [AlbumController::class, 'update']);
        Route::delete('/{album}', [AlbumController::class, 'destroy']);

        Route::get('/{albumParam}/tracks', [AlbumController::class, 'showTracks']);
        Route::post('/{albumParam}/tracks', [AlbumController::class, 'storeTrack']);
    });

    Route::controller(ArtistController::class)->prefix('artists')->group(function () {
        Route::get('/', [ArtistController::class, 'index']);
        Route::post('/', [ArtistController::class, 'store']);
        Route::get('/{param}', [ArtistController::class, 'show']);
        Route::put('/{param}', [ArtistController::class, 'update']);
        Route::patch('/{param}', [ArtistController::class, 'update']);
        Route::delete('/{artist}', [ArtistController::class, 'destroy']);
    });

    Route::controller(TrackController::class)->prefix('tracks')->group(function () {
        Route::get('/', [TrackController::class, 'index']);
        Route::post('/', [TrackController::class, 'store']);
        Route::get('/{trackParam}', [TrackController::class, 'show']);
        Route::put('/{trackParam}', [TrackController::class, 'update']);
        Route::patch('/{trackParam}', [TrackController::class, 'update']);
        Route::delete('/{track}', [TrackController::class, 'destroy']);
    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
