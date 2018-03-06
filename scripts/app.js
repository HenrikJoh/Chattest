const logoutBtn = document.getElementById('logout-btn');
const sendMessage = document.getElementById('send-message');
const db = firebase.database();

firebase.auth().onAuthStateChanged(function(user) {
  if (user != null) {
    // User is signed in.
      const userEmail = user.email;
      const userName = user.displayName;
      document.getElementById('username').innerHTML = userEmail + " " + userName; 
    console.log(user);
}
});

logoutBtn.addEventListener('click', function() {
  const user = firebase.auth().currentUser;
  db.ref('/loggedin').child(user.uid).remove();

    firebase.auth().signOut().then(function() {
      
      window.location.href = "login.html";
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
});

sendMessage.addEventListener('click', function () {
  const message = document.getElementById('message').value;
  const user = firebase.auth().currentUser;
  const date = new Date();
  const timestamp = date.toLocaleTimeString();
  message.value = "";
  db.ref('/userMsg').push({
    username: user.displayName,
    message: message,
    timeStamp: `${timestamp}`
  });

/*     firebase.database().ref('users').set({
      username: user.displayName,
      message: message,
      timestamp: timestamp
    }); */
    
});

window.onbeforeunload = function(e) {
  const user = firebase.auth().currentUser;
  db.ref('/loggedin').child(user.uid).remove();
  firebase.auth().signOut().then(function() {

  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
};