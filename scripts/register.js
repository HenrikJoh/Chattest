
const registerBtn = document.getElementById('register-btn');

registerBtn.addEventListener('click', function () {
    const fullName = document.getElementById('fullname').value;
    const userEmail = document.getElementById('reg-mail').value;
    const password = document.getElementById('reg-pass').value;

    firebase.auth().createUserWithEmailAndPassword(userEmail, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorMessage);
    });

    firebase.auth().onAuthStateChanged(function(user) {

        if (user) {
          user.updateProfile({ // <-- Update Method here

            displayName: fullName,
        
          }).then(function() {
            // Profile updated successfully!
            window.location.href = 'index.html';

          }, function(error) {
            // An error happened.
          });     

        }
});
});