// Signup
import { app, firebaseStore, firebaseAuth } from "./init.js";

console.log(firebaseStore, firebaseAuth);

const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm["signup-email"].value;
	const password = signupForm["signup-password"].value;
	
	const auth = firebaseAuth.getAuth()

    // sign up the user
    firebaseAuth.createUserWithEmailAndPassword(auth, email, password).then((cred) => {
        console.log(cred.user);
        // close the signup modal & reset form
        const modal = document.querySelector("#modal-signup");
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});
