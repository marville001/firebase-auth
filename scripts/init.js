// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import * as firebaseAuth from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import * as firebaseStore from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDhJmeTYY86MKSN7nxaLbrsvjQhwRtafVg",
    authDomain: "marv-game-guide.firebaseapp.com",
    projectId: "marv-game-guide",
    appId: "1:677088095363:web:c4e48b9a99da394e143fb6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, firebaseStore, firebaseAuth, analytics };
