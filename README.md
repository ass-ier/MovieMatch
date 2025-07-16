# MovieMatch

MovieMatch is a full-stack mobile app where friends can swipe on movies and get notified when they both like the same one. Built with React Native (Expo), Node.js/Express, MongoDB, JWT, and Firebase Cloud Messaging.

---

## Features
- User authentication (register/login with JWT)
- Friend management (add/remove friends)
- Movie swiping UI (like/dislike from TMDB)
- Match detection (when friends like the same movie)
- Real-time push notifications (FCM)
- View matched movies with friends

---

## Directory Structure

```
MovieMatch/
├── movie-match-backend/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── friendController.js
│   │   ├── movieController.js
│   │   ├── swipeController.js
│   │   └── matchController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Match.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── friends.js
│   │   ├── movies.js
│   │   ├── swipes.js
│   │   └── matches.js
│   └── utils/
│       └── matchChecker.js
│
├── movie-match-frontend/
│   ├── package.json
│   ├── .env.example
│   ├── assets/
│   └── src/
│       ├── App.js
│       ├── screens/
│       │   ├── LoginScreen.js
│       │   ├── RegisterScreen.js
│       │   ├── SwipeScreen.js
│       │   ├── FriendsScreen.js
│       │   └── MatchesScreen.js
│       ├── components/
│       │   ├── MovieCard.js
│       │   └── MovieModal.js
│       ├── navigation/
│       │   └── AppNavigator.js
│       ├── context/
│       │   └── AuthContext.js
│       └── services/
│           ├── api.js
│           └── firebase.js
```

---

## Setup Instructions

### 1. Backend

1. `cd movie-match-backend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in:
    ```
    PORT=5000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_secret
    TMDB_API_KEY=your_tmdb_key
    FCM_SERVER_KEY=your_firebase_server_key
    ```
4. Start the server:
    ```
    npm run dev
    ```

### 2. Frontend

1. `cd movie-match-frontend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in:
    ```
    API_URL=http://localhost:5000
    FIREBASE_API_KEY=your_firebase_key
    FIREBASE_AUTH_DOMAIN=your_firebase_domain
    FIREBASE_PROJECT_ID=your_firebase_project_id
    FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
    FIREBASE_APP_ID=your_firebase_app_id
    ```
4. Start the app:
    ```
    expo start
    ```

---

## API Endpoints

### Auth
- `POST /auth/register` – Register user
- `POST /auth/login` – Login, return JWT
- `POST /auth/fcm-token` – Save user FCM token

### Friends
- `POST /friends/add` – Add friend by email
- `GET /friends` – Get user’s friend list

### Movies
- `GET /movies` – Fetch movie list from TMDB

### Swipes
- `POST /swipe` – Record movie like and check for matches

### Matches
- `GET /matches` – Get user’s matches with friends

---

## Environment Variables

### Backend (`movie-match-backend/.env`)
- `PORT` – Port to run server
- `MONGODB_URI` – MongoDB connection string
- `JWT_SECRET` – Secret for JWT
- `TMDB_API_KEY` – The Movie Database API key
- `FCM_SERVER_KEY` – Firebase Cloud Messaging server key

### Frontend (`movie-match-frontend/.env`)
- `API_URL` – Backend API URL
- `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_PROJECT_ID`, `FIREBASE_MESSAGING_SENDER_ID`, `FIREBASE_APP_ID` – Firebase config for FCM

---

## Usage
- Register and login on the app
- Add friends by email
- Swipe on movies (like/dislike)
- Get notified when you and a friend both like the same movie
- View matched movies with friends

---

## Tech Stack
- **Frontend:** React Native (Expo), React Navigation, Axios, Firebase
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt, FCM
- **Movie API:** [TMDB](https://www.themoviedb.org/)

---

## License
MIT 