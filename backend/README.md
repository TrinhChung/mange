# Backend API

Chạy app: Cần PHP 8.1, Redis, Node 18

```bash
# 1. Tạo file .env theo mẫu .env.example

# 2. Cài đặt các package
composer install

# 3. Tạo db và seed dữ liệu
php artisan migrate:install
php artisan migrate:fresh --seed

# 4. Chạy app
php artisan serve

# Để có thể gửi mail cần config như trong file env.example và chạy lệnh php artisan queue:work --queue=sendingMail
# Để tự restart queue khi sửa code (chậm hơn queue:work): php artisan queue:listen
```

Link storage vào folder public (để serve file avatar):

```bash
php artisan storage:link
```

Chạy Queue Worker và Laravel Echo Server:

```bash
# Queue Worker (tab riêng)
php artisan queue:work
php artisan queue:work --queue=sendingMail

# hoặc chạy background
nohup php artisan queue:work --daemon >> storage/logs/laravel.log &

# Laravel Echo Server (tab riêng, development)
npm install
npm run echo

# hoặc chạy background (production)
npm i -g pm2
pm2 start laravel-echo-server
```

Chạy test, cần cài xdebug .dll (windows) hoặc .so (linux) để chạy coverage:

```bash
# Tạo file database/database.testing.sqlite

# Chạy laravel test và coverage trong console
php artisan test --coverage

# Html coverage, mở thư mục reports/index.html để xem, có branch coverage
php artisan test --path-coverage --coverage-html=reports
```
