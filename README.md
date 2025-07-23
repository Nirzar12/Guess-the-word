# Guess the Word: A Full-Stack Word Game

![AngularJS](https://img.shields.io/badge/AngularJS-1.8-E23237?logo=angularjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.dot.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-d63aff)
![Bootstrap](https://img.shields.io/badge/Bootstrap-4-563D7C?logo=bootstrap&logoColor=white)

**Guess the Word** is a classic, timed word-guessing game built with a full-stack architecture. It features user authentication, a dynamic scoring system, and a competitive leaderboard. Players must guess a scrambled word based on a provided hint before the timer runs out.

## 🎮 How to Play

1.  **Sign Up & Login**: Create an account or log in to start playing and save your scores.
2.  **Start the Game**: Once logged in, a scrambled word and a hint will appear. A 30-second timer will begin immediately.
3.  **Guess the Word**: Type your guess into the input field and click "Submit Guess".
4.  **Score Points**: If you guess correctly, your score is calculated based on how much time is remaining. The faster you guess, the higher your score!
5.  **Keep Playing**: A new word will appear automatically after a correct guess. If the timer runs out, a new word is also provided.
6.  **Climb the Leaderboard**: Check your ranking against the top 10 players!

## ✨ Key Features

-   **User Authentication**: Secure user registration and login using **JWT (JSON Web Tokens)** and `bcrypt` for password hashing.
-   **Dynamic Gameplay**: Fetches a random scrambled word and a corresponding hint from the backend for each round.
-   **Timed Rounds**: Each round has a 30-second timer to challenge the player.
-   **Scoring System**: The score is calculated based on the time taken to guess the word correctly.
-   **Competitive Leaderboard**: The backend tracks and serves the top 10 players by score.
-   **Simple & Clean UI**: A straightforward, dark-themed interface built with **AngularJS** and styled with **Bootstrap**.

## 🛠️ Tech Stack

-   **Frontend**:
    -   **Framework**: AngularJS
    -   **Styling**: Bootstrap 4, Custom CSS
-   **Backend**:
    -   **Runtime**: Node.js
    -   **Framework**: Express.js
    -   **Authentication**: JWT, Bcrypt.js
    -   **Middleware**: CORS
-   **Database**:
    -   **DB**: MongoDB
    -   **ODM**: Mongoose

## ⚙️ API Endpoints

The backend exposes the following RESTful API endpoints:

| Method | Endpoint                  | Description                                |
| :----- | :------------------------ | :----------------------------------------- |
| `POST` | `/api/auth/signup`        | Register a new user.                       |
| `POST` | `/api/auth/login`         | Log in a user and return a JWT.            |
| `GET`  | `/api/game/random-word`   | Get a random word and hint for the game.   |
| `POST` | `/api/game/update-score`  | Update the score for the logged-in user.   |
| `GET`  | `/api/game/leaderboard`   | Retrieve the top 10 scores.                |

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

-   **Node.js**: v14.x or higher
-   **npm**: Included with Node.js
-   **MongoDB**: A running instance, either local or on a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
-   **Live Server** (or similar tool) for serving the frontend `index.html` file.

### 1. Clone the Repository

```sh
git clone [https://github.com/your-username/Guess-the-word.git](https://github.com/your-username/Guess-the-word.git)
cd Guess-the-word
```

### 2. Configure Environment Variables

Create a `.env` file inside the `/backend` directory and add the following variables:

```ini
# backend/.env

# Server port
PORT=5000

# MongoDB Connection URI
MONGO_URI=mongodb://localhost:27017/guess-the-word

# Secret key for signing JWTs
JWT_SECRET=your_super_secret_jwt_key
```

### 3. Install Dependencies & Run

1.  **Install Backend Dependencies**:
    ```sh
    npm install
    ```

2.  **Start the Backend Server**:
    ```sh
    npm run dev
    ```
    The server will start on `http://localhost:5000`.

3.  **Run the Frontend**:
    -   Navigate to the `/frontend` directory.
    -   Open the `index.html` file with a live server extension (like the one in VS Code) to serve it. The game will be accessible, typically at `http://127.0.0.1:5500/frontend/index.html`.

## 📂 Project Structure

```
Guess-the-word/
├── backend/
│   ├── middleware/
│   │   └── auth.js         # JWT authentication middleware
│   ├── models/
│   │   ├── Score.js
│   │   ├── User.js
│   │   └── Word.js         # Mongoose schemas
│   ├── routes/
│   │   ├── auth.js
│   │   └── game.js         # API routes
│   ├── .env                # Environment variables
│   └── app.js              # Express server entry point
│
├── frontend/
│   ├── app.js              # AngularJS controller and logic
│   └── index.html          # Main HTML file
│
├── .gitignore
├── package.json
└── README.md
