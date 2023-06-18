import { db, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "/firebase.js";
import { app, auth, collection, addDoc, sendPasswordResetEmail } from "/firebase.js";
let userID = null;

document.addEventListener('DOMContentLoaded', function () {


  //signing up 
  if (document.getElementById("register-user") != null) {
    document.getElementById("register-user").addEventListener("click", async function () {
      var email = document.getElementById("Email").value;
      var password = document.getElementById("Password").value;

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(auth.currentUser);

        alert("Email verification sent!");
        userID = auth.currentUser.uid;


        if (userID != null) {
          await signOut(auth);
          window.location.href = 'loginPage.html';
        }
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      }
    });
  }

  //for login:
  if (document.getElementById("Login-user") != null) {

    document.getElementById("Login-user").addEventListener("click", function () {
      var email = document.getElementById("Email").value;
      var password = document.getElementById("Password").value;
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(userCredential);
          if (user.emailVerified) {
            alert(user.email + " Successfully logged in");
            console.log(userCredential);

            // Redirect to home page
            window.location.href = 'home.html';
          } else {
            signOut(auth)
              .then(() => {
                window.location.href = 'loginPage.html';
                alert("You must verify your email first.");
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
              });
          }
        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("unsuccessful sign in attempt \n " + errorMessage);
        });
    });
  }

  onAuthStateChanged(auth, (user) => {

    if (document.getElementById("signOutBtn") != null) {//logout 
      document.getElementById("signOutBtn").addEventListener("click", function () {

        signOut(auth).then(() => {
          alert("Signout successfull");
          window.location.href = 'loginPage.html';

        }).catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

        });
      });
    }
    if (user) {
      document.getElementById("signOutBtn").style.display = 'block';
      if (window.location.href.includes('loginPage.html')) {
        document.getElementById("authForm").style.display = "none";
        document.getElementById("afterLogIn").style.display = "block";
      }
      userID = user.uid;
      console.log('User is logged in:', user.uid);

    } else if (!user) {
      console.log('User isnt logged in');

      if (!(window.location.href.includes('loginPage.html')) &&
        !(window.location.href.includes('signUp.html')) &&
        !(window.location.href.includes('forgot-password.html'))) { window.location.href = 'loginPage.html'; }
      userID = null;
    }
  })

  //reset the password
  if (document.getElementById("resetPasswordForm") != null) {

    var resetPasswordForm = document.getElementById('resetPasswordForm');

    // Add a submit event listener to the form
    resetPasswordForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent form submission

      var email = document.getElementById('email').value;

      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Password reseted. Please check your email.");
          resetPasswordForm.reset(); // Clear the form
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert('Error:  ' + errorMessage);
        });
    });
  }
});

export { userID };