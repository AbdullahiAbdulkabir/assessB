## Loyalty Program

This repo contains the frontend and backend project.

## Backend Installation
Clone the repository and install dependencies:

```bash
cd backend

# Install PHP dependencies
composer install
```

Sample response from postman, i am using uuid instead of id to get a user to avoid knowing the number of data in the users table
![Postman sample](sample-response.jpeg "Postman sample")

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

Seed some users and the achievement:
```bash
php artisan db:seed
```

## Running the Application

Start the development server:

```bash
php artisan serve
```

Test purchase trigger for default user:

```bash
php artisan app:trigger-purchase-event
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
