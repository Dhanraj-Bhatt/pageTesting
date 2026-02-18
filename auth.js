document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  const auth = firebase.auth();

  // Redirect if user is already logged in
  auth.onAuthStateChanged((user) => {
    if (user) {
      if (
        window.location.pathname.includes("login.html") ||
        window.location.pathname.includes("signup.html")
      ) {
        window.location.href = "index.html";
      }
    }
  });

  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = signupForm.email.value;
      const password = signupForm.password.value;
      const confirmPassword = signupForm["confirm-password"].value;

      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          alert("Sign up successful! Please log in.");
          window.location.href = "login.html";
        })
        .catch((error) => {
          alert(`Error: ${error.message}`);
        });
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = loginForm.email.value;
      const password = loginForm.password.value;

      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          window.location.href = "index.html";
        })
        .catch((error) => {
          alert(`Error: ${error.message}`);
        });
    });
  }

  // Google Sign-In
  const googleSignInButton = document.getElementById("google-signin");
  const googleSignUpButton = document.getElementById("google-signup");

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = result.credential;
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        window.location.href = "index.html";
      })
      .catch((error) => {
        // Handle Errors here.
        alert(`Error: ${error.message}`);
      });
  };

  if (googleSignInButton) {
    googleSignInButton.addEventListener("click", signInWithGoogle);
  }
  if (googleSignUpButton) {
    googleSignUpButton.addEventListener("click", signInWithGoogle);
  }

  // Phone Sign-In
  const phoneSignInButton = document.getElementById("phone-signin");
  const phoneSignUpButton = document.getElementById("phone-signup");

  const signInWithPhone = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      }
    );

    const phoneNumber = prompt(
      "Please enter your phone number in E.164 format (e.g., +11234567890)"
    );
    if (!phoneNumber) return;

    const appVerifier = window.recaptchaVerifier;
    auth
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        const code = prompt("Please enter the 6-digit code you received");
        if (!code) return;

        confirmationResult
          .confirm(code)
          .then((result) => {
            // User signed in successfully.
            const user = result.user;
            window.location.href = "index.html";
          })
          .catch((error) => {
            // User couldn't sign in (bad verification code?)
            alert(`Error: ${error.message}`);
          });
      })
      .catch((error) => {
        // Error; SMS not sent
        alert(`Error: ${error.message}`);
      });
  };

  if (phoneSignInButton) {
    phoneSignInButton.addEventListener("click", signInWithPhone);
  }
  if (phoneSignUpButton) {
    phoneSignUpButton.addEventListener("click", signInWithPhone);
  }
});
