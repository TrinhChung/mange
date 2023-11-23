<?php

return [
    'url_sentiment' => 'https://language.googleapis.com/v2/documents:analyzeSentiment',
    'url_moderate' => 'https://language.googleapis.com/v2/documents:moderateText',
    'api_key' => env('GOOGLE_API_KEY', ''),
];
