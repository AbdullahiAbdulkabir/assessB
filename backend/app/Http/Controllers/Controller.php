<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

abstract class Controller
{
    /**
     * @param mixed|null $data
     */
    public function success(string $message, mixed $data = null, int $statusCode = 200): JsonResponse
    {

        $response = [
            'success' => true,
            'data' => $data,
            'message' => $message,
        ];

        if(is_null($response['data'])) unset($response['data']);

        return response()->json($response, $statusCode);
    }

    public function error(string $message, int $code = 500, array $errors = [], array $errorData = []): JsonResponse
    {
        $data = [
            'success' => false,
            'message' => $message,
        ];

        if (count($errors)) {
            $data['errors'] = $errors;
        }

        if (count($errorData)) {
            $data['data'] = $errorData;
        }

        return response()->json($data, $code);
    }
}
