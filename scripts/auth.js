// Signup
import { app, firebaseStore, firebaseAuth } from "./init.js";
import { setupGuides } from "./index.js";

const auth = firebaseAuth.getAuth();
const firestore = firebaseStore.getFirestore();

// listen for auth status changes
firebaseAuth.onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("user logged in: ", user);
        const ref = firebaseStore.collection(firestore, "/guides");
        firebaseStore.getDocs(ref).then((snapshot) => {
            setupGuides(snapshot.docs);
        });
    } else {
		console.log("user logged out");
		setupGuides([]);
    }
});

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
    firebaseAuth.signOut(auth).then(() => {});
});

// login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm["login-email"].value;
    const password = loginForm["login-password"].value;

    // log the user in
    firebaseAuth
        .signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            // close the signup modal & reset form
            const modal = document.querySelector("#modal-login");
            M.Modal.getInstance(modal).close();
            loginForm.reset();
        });
});
