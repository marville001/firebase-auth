// Signup
import { app, firebaseStore, firebaseAuth } from "./init.js";
import { setupGuides, setupUI } from "./index.js";

const auth = firebaseAuth.getAuth();
const firestore = firebaseStore.getFirestore();
const guidesRef = firebaseStore.collection(firestore, "/guides");

// listen for auth status changes
firebaseAuth.onAuthStateChanged(auth, (user) => {
    if (user) {
        setupUI(user);
        firebaseStore.getDocs(guidesRef).then((snapshot) => {
            setupGuides(snapshot.docs);
        });
    } else {
        setupUI();
        setupGuides([]);
    }
});

console.log(firebaseStore);

// create new guide
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", (e) => {
    e.preventDefault();
    firebaseStore
        .addDoc(guidesRef, {
            title: createForm.title.value,
            content: createForm.content.value,
        })
        .then(() => {
            // close the create modal & reset form
            const modal = document.querySelector("#modal-create");
            M.Modal.getInstance(modal).close();
            createForm.reset();
        })
        .catch((err) => {
            console.log(err.message);
        });
});

// Sign up
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
