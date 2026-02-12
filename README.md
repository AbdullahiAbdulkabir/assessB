## Loyalty Program

This repo contains the frontend and backend project.

## Backend Installation
Clone the repository and install dependencies:

```bash
cd backend

# Install PHP dependencies
composer install
```

## Environment Configuration

Copy the example environment file and set up the required configurations:

```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

Run migration:
```bash
php artisan migrate
```

Seed some projects:
```bash
php artisan db:seed
```

## Running the Application

Start the development server:

```bash
php artisan serve
```

Visit the url.

```bash
./vendor/bin/sail up
```
## Deployment

### Deploying to Production

For production deployment, set up your web server:

```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```
