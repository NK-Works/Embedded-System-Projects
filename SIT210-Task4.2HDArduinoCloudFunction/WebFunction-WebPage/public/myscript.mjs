/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 02/09/2023                      */

// Importing the required modules to run the functionalities of the firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

// Configuration (Unique)
/* I am removing the sensitive data regarding the apiKeys and the databse URLs, */
/* The authentication for my webpage is set to anonymous which is the least seccure way.*/
/* You must generate your personal configurations in the firebase website. */
const firebaseConfig = {
    apiKey: "Your API Key here",
    authDomain: "Your domain here",
    databaseURL: "Your database URL here",
    projectId: "nksit210taskwf",
    storageBucket: "Your storage bucket here",
    messagingSenderId: "Your sender ID here",
    appId: "Your App ID here"
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
