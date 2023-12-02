<!DOCTYPE html>
<html>
<head>
    <title>Kích hoạt tài khoản</title>
</head>
<body>

    <h1>Hi, {{ $user->username }}</h1>
    <p>{{ $user->email }}</p>

    <p>Kích hoạt tài khoản của bạn bằng cách nhấn vào đường link dưới đây</p>
    <a href="{{env('APP_ENV') === 'production' ? 'https://api.mange.uetvnu.id.vn/activate'.$user->active_token : 'http://localhost:8000/activate/'.$user->active_token}}">Kích hoạt</a>
</body>
</html>
