<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
               // Render Inertia error pages for specific HTTP status codes
               $exceptions->render(function (Throwable $e, $request) {
                $response = (new \Illuminate\Foundation\Exceptions\Handler(app()))->render($request, $e);
    
                // Check if the request expects a JSON response
                if ($request->wantsJson()) {
                    return $response;
                }
    
                // Render Inertia error pages for specific HTTP status codes
                if (in_array($response->getStatusCode(), [403, 404, 419,500])) {
                    return Inertia::render('Errors/' . $response->getStatusCode(), [
                        'status' => $response->getStatusCode(),
                    ])->toResponse($request)->setStatusCode($response->getStatusCode());
                }
    
                return $response;
            });
        })->create();
