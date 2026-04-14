# CineVerse

CineVerse is a full-stack movie review and discovery platform built with React, Vite, Express, MySQL, and TMDB. It enables users to sign up, log in, search and filter movies, view movie details, write reviews, and see sentiment and bias analysis for submitted reviews.

## Features

- User authentication with sign up, login, logout
- Profile dashboard showing user reviews, average rating, and review history
- TMDB-powered movie discovery:
  - Trending movies
  - Search by title
  - Filter by genre and release year range
  - Movie detail pages with cast, overview, and review aggregation
- Review workflow:
  - Write reviews with 5-star rating input
  - Edit and delete reviews
  - Submit reviews to external sentiment and hate-speech analysis APIs
- Responsive React UI with Tailwind CSS
- Backend API built with Express and Sequelize
- JWT cookie authentication for protected actions

## Tech Stack

- Frontend
  - React
  - Vite
  - Zustand
  - Tailwind CSS
  - React Router DOM
  - Axios
- Backend
  - Node.js
  - Express
  - Sequelize ORM
  - MySQL
  - JSON Web Tokens
  - Cloudinary
  - TMDB API

## Repository Structure

- `backend/` - Express backend
  - `controllers/` - request handlers for auth, movies, reviews, users
  - `routes/` - API route definitions
  - `models/` - Sequelize models for `User` and `Review`
  - `config/` - DB and TMDB configuration
  - `lib/` - Cloudinary and utility helpers
  - `middleware/` - authentication middleware
- `frontend/` - React Vite frontend
  - `src/pages/` - page views like Home, MovieDetail, Profile, WriteReview
  - `src/components/` - reusable UI components
  - `src/store/` - Zustand stores for auth, movie, review state
  - `src/services/api.js` - Axios API client

## Environment Variables

Create a `.env` file inside `backend/` and populate it with:

```env
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
DB_PORT=3306
CA=path/to/ca.pem
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

> Note: `CA` is used by Sequelize for MySQL SSL connections. If your database does not require SSL, you may still need to remove or adjust this option in `backend/config/db.js`.

## Install

Install backend and frontend dependencies separately:

```bash
cd c:\Users\neera\Desktop\CineVerse
npm install --prefix backend
npm install --prefix frontend
```

## Run Locally

### Backend only

```bash
npm run dev --prefix backend
```

### Frontend only

```bash
npm run dev --prefix frontend
```

### Full App in Production Mode

Build the frontend and start the backend server:

```bash
npm run build
npm start
```

The backend serves the frontend bundle from `frontend/dist` when `NODE_ENV=production`.

## API Endpoints

### Auth
- `POST /api/auth/signup` - register a new user
- `POST /api/auth/login` - log in existing user
- `POST /api/auth/logout` - log out user
- `GET /api/auth/check` - verify authentication
- `PUT /api/auth/update-profile` - upload/update profile picture
- `POST /api/auth/delete-account` - delete user account

### User
- `GET /api/users/profile` - fetch current user profile and review history

### Movies
- `GET /api/movies/trending` - fetch trending TMDB movies
- `GET /api/movies/search?query=...` - search movies by title
- `GET /api/movies/filter?genreId=...&startYear=...&endYear=...` - filter movies by genre and year range
- `GET /api/movies/:id` - fetch movie details and cast info

### Reviews
- `GET /api/reviews/:tmdb_id` - fetch reviews for a movie
- `POST /api/reviews` - submit a new review (authenticated)
- `PUT /api/reviews/update-review/:id` - update a review (authenticated)
- `DELETE /api/reviews/delete-review/:id` - delete a review (authenticated)

## Notes

- The review submission flow calls external AI endpoints for sentiment and hate speech analysis.
- Reviews are stored with `rating`, `review_text`, `sentiment`, `biased`, and a placeholder `fake` score.
- Authentication uses secure JWT cookies.
- The frontend uses `Zustand` to manage auth, movie discovery, and review state.

## Improvements / Extensions

Potential next steps for CineVerse:

- add real spam detection support to review scoring
- implement pagination for long review lists
- add a movie watchlist or favorites system
- expand analysis dashboards with visual sentiment trends
- add unit tests and integration tests for backend APIs

---

## Author

Neeraj Prajapat
