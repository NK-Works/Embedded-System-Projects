// This code is made by Anneshu Nag, Student ID- 2210994760 //
//                    Dated- 11/08/2023                     //

//                This is a Blink Program                   // 
//         It blinks the in-built LED using Morse Code      //
//                It blinks my first name                   //

// Defining some constants that are to be used in the code
const int ledPin = LED_BUILTIN; // Built-in LED connected to digital pin 13
const int buttonPin = 2; // Push button connected to digital pin 2
const int morseUnitDuration = 500; // Duration in milliseconds for a single unit of Morse code

bool blinking = false; // Initially keeping the checker to false state so that the LED doesn't blink until the button is pressed 

// Morse Code for each letter of the word "ANNESHU" i.e. my first name
// Storing the Morse Code of my first name in an array 
// If we want to chnage the name, we can simply change the Morse Code in this array and we can reuse the rest of the code as it is
const char* myMorsecodes[] = {
  ".-",    // A
  "-.",    // N
  "-.",    // N
  ".",     // E
  "...",   // S
  "....",  // H
  "..-",   // U 
};

// Setting up the pins for the LED and the button
void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP); // Activating the the internal pull-up resistor for the push button
}

// Main program where loop will run
void loop() {
  if (digitalRead(buttonPin) == LOW) {// Low means the button is pressed 
    blinking = !blinking; // Changing the status of the checker depending on whether it is true or false
    delay(100); // Setting the delay to avoid multiple button presses in quick succession
  }

  // When 'blinking' checker is true then run this
  if (blinking) {
    blinkName();
  } else {
    digitalWrite(ledPin, LOW); // Turn off the LED when not blinking
  }
}

// Iterating through the Morse Code here
void blinkName() {
  for (int i = 0; i < sizeof(myMorsecodes) / sizeof(myMorsecodes[0]); i++) {
    const char* morseCode = myMorsecodes[i]; // Assinging the [i]th element to a variable
    
    for (int j = 0; morseCode[j] != '\0'; j++) {// Running until null-terminator arrives stopping the Morse Code

      if (morseCode[j] == '.') {
        dot();
      } else if (morseCode[j] == '-') {
        dash();
      }
      delay(morseUnitDuration); // Pausing between dots and dashes of the Morse Code
    }
    delay(morseUnitDuration * 3); // Pausing between the letters of the name
  }
  blinking = false;
}

void dot() {
  digitalWrite(ledPin, HIGH);
  delay(morseUnitDuration);
  digitalWrite(ledPin, LOW);
}

void dash() {
  digitalWrite(ledPin, HIGH);
  delay(morseUnitDuration * 3); // 3X extra time blink for the dashes 
  digitalWrite(ledPin, LOW);
}
