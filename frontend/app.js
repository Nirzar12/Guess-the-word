// Define the AngularJS app
var app = angular.module('wordGameApp', []);



app.controller('GameController', function($scope, $http,$interval) {
    $scope.isAuthenticated = false;
    $scope.username = '';
    $scope.loginUsername = '';
    $scope.loginPassword = '';
    $scope.signupUsername = '';
    $scope.signupPassword = '';

  $scope.scrambledWord = ''; // The scrambled word
  $scope.hint = ''; // Hint for the scrambled word
  $scope.userGuess = ''; // User input for guess
  $scope.score = 0;  // Score variable
  $scope.timer = 120; // Timer countdown (in seconds)
  $scope.timerActive = false; // To start/stop the timer
  $scope.leaderboard = []; // Leaderboard data

  // Login function
  $scope.login = function() {
    $http.post('http://localhost:5000/api/auth/login', {
      username: $scope.loginUsername,
      password: $scope.loginPassword
    })
    .then(function(response) {
      // Store the token and username in local storage or session
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);

      $scope.isAuthenticated = true;
      $scope.username = response.data.username;
      window.location.reload();
    })
    .catch(function(error) {
      console.error("Login error:", error);
      alert('Login failed');
    });
  };

  // Signup function
  $scope.signup = function() {
    $http.post('http://localhost:5000/api/auth/signup', {
      username: $scope.signupUsername,
      password: $scope.signupPassword
    })
    .then(function(response) {
      alert("Signup successful, please login.");
    })
    .catch(function(error) {
      console.error("Signup error:", error);
      alert('Signup failed');
    });
  };

  // Check if user is authenticated on page load
  if (localStorage.getItem('token')) {
    $scope.isAuthenticated = true;
    $scope.username = localStorage.getItem('username');
  };


  // Timer function
  var countdown;
  $scope.startTimer = function() {
    if ($scope.timerActive) return; // Prevent starting multiple timers

    $scope.timerActive = true;
    countdown = $interval(function() {
      if ($scope.timer > 0) {
        $scope.timer--;
      } else {
        $scope.timerActive = false;
        alert("Time's up! Try again.");
        $scope.getRandomWord();  // Get a new word when time is up
        $scope.userGuess = ''; // Reset guess
      }
    }, 1000);
  };

  // Stop timer if user guesses the word
  $scope.stopTimer = function() {
    if (countdown) {
      $interval.cancel(countdown);
      $scope.timerActive = false;
    }
  };

  // Function to get a random word and hint from the backend
  $scope.getRandomWord = function() {
    $http.get('http://localhost:5000/api/game/random-word')
      .then(function(response) {
        const wordData = response.data;
        $scope.scrambledWord = wordData.scrambledWord;
        $scope.originalWord = wordData.word; // Store the real word!
        $scope.hint = wordData.hint;
        $scope.timer = 30;
        $scope.startTimer();
      })
      .catch(function(error) {
        console.error("Error getting word:", error);
      });
  };

  // Function to check the user's guess and update score
  $scope.checkAnswer = function() {
    if ($scope.userGuess.toLowerCase().trim() === $scope.originalWord.toLowerCase()) {
      alert("Correct! Well done.");
      $scope.stopTimer();
      $scope.updateScore(); // Update score on backend
      $scope.getLeaderboard(); // Refresh leaderboard immediately
      $scope.getRandomWord(); // New word
      $scope.userGuess = ''; // Reset input
    } else {
      alert("Incorrect. Try again.");
    }
  };

  // Function to update the score
  $scope.updateScore = function() {
    const timePenalty = (30 - $scope.timer) * 10; // Deduct points based on time left
    const finalScore = Math.max(0, 100 - timePenalty); // Score is between 0 and 100

    $http.post('http://localhost:5000/api/game/update-score', {
      username: localStorage.getItem('username'),
      score: finalScore
    })
    .then(function(response) {
      console.log("Score updated successfully:", response.data);
    })
    .catch(function(error) {
      console.error("Error updating score:", error);
    });
  };

  // Function to fetch the leaderboard
  $scope.getLeaderboard = function() {
    $http.get('http://localhost:5000/api/game/leaderboard')
      .then(function(response) {
        $scope.leaderboard = response.data;
      })
      .catch(function(error) {
        console.error("Error fetching leaderboard:", error);
      });
  };
  // Logout function
$scope.logout = function() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    $scope.isAuthenticated = false;
    $scope.username = '';
    $scope.stopTimer(); // <- This will stop the active timer
  };
   // Initialize the game and leaderboard when the page loads
 // Check if user is authenticated on page load
if (localStorage.getItem('token')) {
    $scope.isAuthenticated = true;
    $scope.username = localStorage.getItem('username');
    $scope.getRandomWord();    // Only if logged in
    $scope.getLeaderboard();   // Only if logged in
}
});
