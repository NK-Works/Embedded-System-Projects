/* This code is made by Anneshu Nag, Student ID- 2210994760  */
/*                    Dated- 31/08/2023                      */

/* In this code, the Arduino Nano 33 IoT is acting as the subscriber. */
#include <ArduinoMqttClient.h>
#include <WiFiNINA.h>

// WiFi credentials
char ssid[] = "Your WiFi SSID";  // Your WiFi SSID
char pass[] = "Your WiFI Password";  // You WiFi Password

// Pin for controlling the light
int LEDPin = 4;

// WiFi and MQTT client instances
WiFiClient wifiClient;
MqttClient mqttClient(wifiClient);

// MQTT broker details
const char broker[] = "mqtt-dashboard.com";
int port = 1883;
const char topic[] = "NK-Works/MQTT/Test";

void setup() {
  Serial.begin(9600);
  pinMode(LEDPin, OUTPUT);
  
  // Wait for serial port to connect
  while (!Serial) {
    ; 
  }

  Serial.print("Attempting to connect to SSID: ");
  Serial.println(ssid);
  
  // Attempt to connect to WiFi network
  while (WiFi.begin(ssid, pass) != WL_CONNECTED) {
    Serial.print(".");
    delay(5000);
  }

  Serial.println("You're connected to the network");
  Serial.println();

  Serial.print("Attempting to connect to the MQTT broker: ");
  Serial.println(broker);

  // Connect to MQTT broker
  if (!mqttClient.connect(broker, port)) {
    Serial.print("MQTT connection failed! Error code = ");
    Serial.println(mqttClient.connectError());

    while (1);
  }

  Serial.println("You're connected to the MQTT broker!");
  Serial.println();

  // Set up MQTT message handler
  mqttClient.onMessage(onMqttMessage);

  Serial.print("Subscribing to topic: ");
  Serial.println(topic);
  Serial.println();

  // Subscribe to the specified topic
  mqttClient.subscribe(topic);

  Serial.print("Topic: ");
  Serial.println(topic);

  Serial.println();
}

void loop() {
  // Keep the MQTT connection alive
  mqttClient.poll();
}

// MQTT message handler
void onMqttMessage(int messageSize) {
  Serial.println("Received a message with topic '");
  Serial.print(mqttClient.messageTopic());
  Serial.print("', length ");
  Serial.print(messageSize);
  Serial.println(" bytes:");

  // Read and print the received message
  while (mqttClient.available()) {
    Serial.print((char)mqttClient.read());
  }
  Serial.println();

  // Flash the LED as a notification (3 times per publish)
  digitalWrite(LEDPin, HIGH);   
  delay(300);                      
  digitalWrite(LEDPin, LOW);   
  delay(300);
  digitalWrite(LEDPin, HIGH);   
  delay(300);                    
  digitalWrite(LEDPin, LOW);   
  delay(300);
  digitalWrite(LEDPin, HIGH);   
  delay(300);                    
  digitalWrite(LEDPin, LOW);   
  delay(300);

  Serial.println();
}
