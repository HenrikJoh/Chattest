const loginBtn = document.getElementById('login-btn');
const db = firebase.database();
firebase.auth().onAuthStateChanged(function(user) {
    if (user != null) {
      // User is signed in.
      db.ref('/loggedin').child(user.uid).set(user.displayName);
      window.location.href = "index.html"

    }
  });

  loginBtn.addEventListener('click', function () {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorMessage);
      });
  });