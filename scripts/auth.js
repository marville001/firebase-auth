// Signup
import { app, firebaseStore, firebaseAuth } from "./init.js";

const auth = firebaseAuth.getAuth();

console.log(firebaseAuth);

const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm["signup-email"].value;
    const password = signupForm["signup-password"].value;

    // sign up the user
    firebaseAuth
        .createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log(cred.user);
            // close the signup modal & reset form
            const modal = document.querySelector("#modal-signup");
            M.Modal.getInstance(modal).close();
            signupForm.reset();
        });
});

// logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
    e.preventDefault();
    firebaseAuth.signOut(auth).then(() => {
        console.log("user signed out");
    });
});
