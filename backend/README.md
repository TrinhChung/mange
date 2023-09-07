# Backend API

Chạy app:

```bash
# 1. Tạo file .env theo mẫu .env.example

# 2. Cài đặt các package
composer install

# 3. Tạo db và seed dữ liệu
php artisan migrate:install
php artisan migrate:fresh --seed

# 4. Chạy app
php artisan serve
```
