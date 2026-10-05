# School Finder

A bilingual (English/Swahili) web platform that helps parents and students in Tanzania discover and compare schools by region, level, category, type, and gender, with an admin dashboard for managing school data and tracking search activity.

🔗 **Live demo:** https://school-finder-4358faf3d79b.herokuapp.com

## Features

### For visitors
- **Smart search** by school name with live autocomplete suggestions
- **Advanced filters:** region, level, category, school type, and gender
- **Paginated results** with loading skeletons for a smooth experience
- **School detail pages** (SEO-friendly slug URLs) showing description, location, contact details, website, social links, and the subjects offered at each level
- **English / Swahili toggle**, with the preference remembered in the browser

### For administrators
- **Secure admin area** (authentication via Laravel Breeze)
- **Full school CRUD:** create, edit, and delete schools, with soft deletes
- **Dynamic level-to-subject assignment:** subjects load based on the levels selected
- **Rich-text editor** for English and Swahili descriptions
- **Analytics dashboard** with charts for:
  - Total schools and schools added today, this week, and this month
  - Distribution by category, type, gender, level, and region
  - Most popular subjects
  - Data completeness (schools with website, phone, and email)
  - Popular search criteria and unique visitors (from search logs)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Laravel 12, PHP 8.2+ |
| Frontend | React 18 with Inertia.js 2 |
| Styling | Tailwind CSS, Headless UI |
| Build tool | Vite |
| Database | PostgreSQL |
| Auth | Laravel Breeze, Sanctum |
| Charts | Chart.js, Recharts |
| Other | Ziggy (named routes in JS), React Quill, SweetAlert2, React Data Table |

## Data Model

Schools belong to a **region**, **category**, **type**, and **gender** classification, and have many **levels** and **subjects** (subjects are linked per level through a pivot table). Search activity is stored in `search_logs` to power the admin analytics.

## Getting Started

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+ and npm
- PostgreSQL

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd school_finder

# 2. Install dependencies
composer install
npm install

# 3. Configure environment
cp .env.example .env
php artisan key:generate
# Set your PostgreSQL credentials (DB_*) in .env

# 4. Set up the database (runs migrations and seeds regions, levels, subjects, schools)
php artisan migrate --seed

# 5. Run the app
npm run dev          # in one terminal
php artisan serve    # in another
```

Visit `http://localhost:8000`.

### Admin access
Register an account at `/register`, then sign in to reach the admin dashboard at `/admin/dashboard`.

## Deployment (Heroku)

The repository includes a `Procfile` and `deploy.sh`. On each release, Heroku runs migrations and seeders, then serves the app from `public/`.

```
release: bash ./deploy.sh
web: vendor/bin/heroku-php-apache2 public/
```

Set `APP_KEY`, `APP_ENV=production`, and your database config vars in Heroku. The `heroku-postbuild` script builds the frontend assets automatically.


## Roadmap

- Map view of school locations
- Reviews and ratings
- School comparison tool
- Image galleries for schools

## Author

Built by **Sharon**, Laravel developer.

## License

Open-sourced under the [MIT license](https://opensource.org/licenses/MIT).