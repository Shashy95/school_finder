<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SchoolController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [SchoolController::class, 'index'])->name('home');
Route::get('/schools', [SchoolController::class, 'list'])->name('schools.list');
Route::get('/schools/{slug}', [SchoolController::class, 'show'])->name('schools.show');
Route::post('/set-language', [SchoolController::class, 'setLanguage'])->name('set.language');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__.'/auth.php';
