
#Welcome to my Guess-the-word Game

"Guess the Word" is a fun and interactive word-guessing game where players try to identify a hidden word by guessing one letter at a time or the full word. The game typically provides a clue or category, and the word is displayed as a series of blanks representing each letter. With each correct guess, the corresponding letters are revealed. The goal is to guess the entire word before running out of attempts.


## Tech Stack

**Client:** AngularJS

**Server:** Node, Express

**Database:** MongoDB


## Run Locally

Clone the project

```bash
  git clone https://github.com/Nirzar12/Guess-the-word.git
```

Go to the project directory

```bash
  cd Guess-the-word 
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


Now Go to the frontend directory and open index.html

```bash
  cd .. 
  
```

Click on live server in vs code to run frontend

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`=5000

`MONGO_URI`=mongodb://localhost:27017/guess-the-word

`JWT_SECRET`=your_jwt_secret_here

