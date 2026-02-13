## Loyalty Program

This repo contains the frontend and backend project.

## Backend Installation
Clone the repository and install dependencies:

```bash
cd backend

# Install PHP dependencies
cd backend && composer install
```

## Environment Configuration

Copy the example environment file and set up the required configurations:

```bash
cd backend && cp .env.example .env
```

Generate the application key:

```bash
cd backend && php artisan key:generate
```

Run migration:
```bash
cd backend && php artisan migrate
```

Seed some users and the achievement:
```bash
cd backend && php artisan db:seed
```

## Running the Application

Start the development server:

```bash
cd backend && php artisan serve
```

Visit the url.

```bash
cd backend && ./vendor/bin/sail up
```
## Deployment

### Deploying to Production

For production deployment, set up your web server:

```bash
cd backend && php artisan config:cache
cd backend && php artisan route:cache
cd backend && php artisan view:cache
```
