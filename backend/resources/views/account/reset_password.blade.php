<!DOCTYPE html>
<html>
<head>
    <title>Thay đổi mật khẩu của bạn</title>
</head>
<body>

    <h1>Hi, {{ $user->username }}</h1>
    <p>{{ $user->email }}</p>

    <p>Hãy nhấn vào đường link dưới để tiếp tục</p>
    <a href="{{env('APP_ENV') === 'production' ? 'https://recurup.com/new-password?token='.$user->reset_token : 'http://localhost:3000/new-password?token='.$user->reset_token}}">Đổi mật khẩu</a>
</body>
</html>
