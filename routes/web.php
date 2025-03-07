<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\SchoolController as AdminSchoolController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SchoolController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [SchoolController::class, 'index'])->name('home');
Route::get('/schools', [SchoolController::class, 'list'])->name('schools.list');
Route::get('/schools/{slug}', [SchoolController::class, 'show'])->name('schools.show');

Route::middleware('auth')->prefix('admin')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::resource('/schools', AdminSchoolController::class)->names('admin.schools');
});

/*

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
*/



require __DIR__.'/auth.php';
