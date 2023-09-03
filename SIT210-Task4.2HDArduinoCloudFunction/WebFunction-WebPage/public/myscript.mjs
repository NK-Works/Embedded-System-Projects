/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 02/09/2023                      */

// Importing the required modules to run the functionalities of the firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

// Configuration (Unique)
const firebaseConfig = {
    apiKey: "AIzaSyCY3R0IeKmEjbI6NCZnIKWyES4wNuL5NtY",
    authDomain: "nksit210taskwf.firebaseapp.com",
    databaseURL: "https://nksit210taskwf-default-rtdb.firebaseio.com",
    projectId: "nksit210taskwf",
    storageBucket: "nksit210taskwf.appspot.com",
    messagingSenderId: "366284117229",
    appId: "1:366284117229:web:b798945b9c366f4dcc28e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Sign in anonymously
signInAnonymously(getAuth(app))
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("Anonymous user ID:", user.uid);
    })
    .catch((error) => {
        console.error("Anonymous sign-in error:", error);
    });

// Functions to send data to Realtime Database
export function glowRedLED() {
    set(ref(database, "mypath/"), {
        caught: "red"   // Sends "red"
    });
}

export function glowYellowLED() {
    set(ref(database, "mypath/"), {
        caught: "yellow"   // Sends "yellow"
    });
}

export function glowGreenLED() {
    set(ref(database, "mypath/"), {
        caught: "green"   // Sends "green"
    });
}

export function dontGlowLED() {
    set(ref(database, "mypath/"), {
        caught: "switchoff"   // Sends "switchoff"
    });
}