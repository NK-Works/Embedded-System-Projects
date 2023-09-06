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

// Function to send data to Realtime Database and change the displayed image
function sendAndDisplayData(color) {
    // Send data to the database
    set(ref(database, "mypath/"), {
        caught: color
    });

    // Hide all images
    hideAllImages();

    // Display the relevant image based on the color
    if (color === "red") {
        document.getElementById('redImage').style.display = 'block';
    } else if (color === "yellow") {
        document.getElementById('yellowImage').style.display = 'block';
    } else if (color === "green") {
        document.getElementById('greenImage').style.display = 'block';
    } else {
        // Default case: "switchoff" or any other unknown value
        document.getElementById('defaultImage').style.display = 'block';
    }
}

// Function to hide all images
function hideAllImages() {
    document.getElementById('defaultImage').style.display = 'none';
    document.getElementById('redImage').style.display = 'none';
    document.getElementById('yellowImage').style.display = 'none';
    document.getElementById('greenImage').style.display = 'none';
}

// Button click functions
export function glowRedLED() {
    sendAndDisplayData("red");
}

export function glowYellowLED() {
    sendAndDisplayData("yellow");
}

export function glowGreenLED() {
    sendAndDisplayData("green");
}

export function dontGlowLED() {
    sendAndDisplayData("switchoff");
}
