var mosca = require('mosca'); //MOSCA Imported
//var firebase = require('firebase');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // trust self signed certificate
var mqtt = require('mqtt'); //MQTT Imported
var client  = mqtt.connect('mqtt://localhost');//IP of the machine which the server is hosted
var SECURE_KEY = __dirname + '/tls-key.pem'; //Location of secure key
var SECURE_CERT = __dirname + '/tls-cert.pem'; //Location of Secure Cert
var firebase = require("firebase"); //Load Firebase Package

var settings = { //Server settings
  secure : {
    port: 8883, //Secure MQTT port
    keyPath: SECURE_KEY,
    certPath: SECURE_CERT,
    allowNonSecure: false, //Denies Nonsecure Connections
  }
};

firebase.initializeApp({ //by adding your credentials, you get authorized to read and write from the database
  serviceAccount: "./blah-blah-89dbe-firebase-adminsdk-3tlno-0c1e5ae18a.json",
  databaseURL: "https://blah-blah-89dbe.firebaseio.com/"
});

var db = firebase.database();
var ref = db.ref("/MQTTmessage");

//Server Setup
var server = new mosca.Server(settings);

//Server Init
server.on('ready', function(){ //Server is ready for messages
   console.log(" ▄▄▄▄▄▄▄▄▄▄▄  ▄    ▄  ▄         ▄  ▄▄        ▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄       ▄▄▄▄▄▄▄▄▄▄▄  ▄▄        ▄  ▄            ▄▄▄▄▄▄▄▄▄▄▄  ▄▄        ▄  ▄▄▄▄▄▄▄▄▄▄▄ ")
   console.log("▐░█▀▀▀▀▀▀▀▀▀ ▐░▌ ▐░▌ ▐░▌       ▐░▌▐░▌░▌     ▐░▌▐░█▀▀▀▀▀▀▀▀▀  ▀▀▀▀█░█▀▀▀▀      ▐░█▀▀▀▀▀▀▀█░▌▐░▌░▌     ▐░▌▐░▌           ▀▀▀▀█░█▀▀▀▀ ▐░▌░▌     ▐░▌▐░█▀▀▀▀▀▀▀▀▀ ")
   console.log("▐░▌          ▐░▌▐░▌  ▐░▌       ▐░▌▐░▌▐░▌    ▐░▌▐░▌               ▐░▌          ▐░▌       ▐░▌▐░▌▐░▌    ▐░▌▐░▌               ▐░▌     ▐░▌▐░▌    ▐░▌▐░▌          ")
   console.log("▐░█▄▄▄▄▄▄▄▄▄ ▐░▌░▌   ▐░█▄▄▄▄▄▄▄█░▌▐░▌ ▐░▌   ▐░▌▐░█▄▄▄▄▄▄▄▄▄      ▐░▌          ▐░▌       ▐░▌▐░▌ ▐░▌   ▐░▌▐░▌               ▐░▌     ▐░▌ ▐░▌   ▐░▌▐░█▄▄▄▄▄▄▄▄▄ ")
   console.log("▐░░░░░░░░░░░▌▐░░▌    ▐░░░░░░░░░░░▌▐░▌  ▐░▌  ▐░▌▐░░░░░░░░░░░▌     ▐░▌          ▐░▌       ▐░▌▐░▌  ▐░▌  ▐░▌▐░▌               ▐░▌     ▐░▌  ▐░▌  ▐░▌▐░░░░░░░░░░░▌")
   console.log(" ▀▀▀▀▀▀▀▀▀█░▌▐░▌░▌    ▀▀▀▀█░█▀▀▀▀ ▐░▌   ▐░▌ ▐░▌▐░█▀▀▀▀▀▀▀▀▀      ▐░▌          ▐░▌       ▐░▌▐░▌   ▐░▌ ▐░▌▐░▌               ▐░▌     ▐░▌   ▐░▌ ▐░▌▐░█▀▀▀▀▀▀▀▀▀ ")
   console.log("          ▐░▌▐░▌▐░▌       ▐░▌     ▐░▌    ▐░▌▐░▌▐░▌               ▐░▌          ▐░▌       ▐░▌▐░▌    ▐░▌▐░▌▐░▌               ▐░▌     ▐░▌    ▐░▌▐░▌▐░▌          ")
   console.log(" ▄▄▄▄▄▄▄▄▄█░▌▐░▌ ▐░▌      ▐░▌     ▐░▌     ▐░▐░▌▐░█▄▄▄▄▄▄▄▄▄      ▐░▌          ▐░█▄▄▄▄▄▄▄█░▌▐░▌     ▐░▐░▌▐░█▄▄▄▄▄▄▄▄▄  ▄▄▄▄█░█▄▄▄▄ ▐░▌     ▐░▐░▌▐░█▄▄▄▄▄▄▄▄▄")
   console.log("▐░░░░░░░░░░░▌▐░▌  ▐░▌     ▐░▌     ▐░▌      ▐░░▌▐░░░░░░░░░░░▌     ▐░▌          ▐░░░░░░░░░░░▌▐░▌      ▐░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌      ▐░░▌▐░░░░░░░░░░░▌")
   console.log(" ▀▀▀▀▀▀▀▀▀▀▀  ▀    ▀       ▀       ▀        ▀▀  ▀▀▀▀▀▀▀▀▀▀▀       ▀            ▀▀▀▀▀▀▀▀▀▀▀  ▀        ▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀        ▀▀  ▀▀▀▀▀▀▀▀▀▀▀ ")
});

server.on('clientConnected', function(client) { //A worker has been detected and is ready to receive message
     console.log('██╗    ███████╗███████╗███████╗    ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ████████╗ ██████╗ ██████╗ ')
     console.log('██║    ██╔════╝██╔════╝██╔════╝    ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗')
     console.log('██║    ███████╗█████╗  █████╗         ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║   ██║   ██║   ██║██████╔╝')
     console.log('██║    ╚════██║██╔══╝  ██╔══╝         ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║   ██║   ██║   ██║██╔══██╗')
     console.log('██║    ███████║███████╗███████╗       ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║   ██║   ╚██████╔╝██║  ██║')
     console.log('╚═╝    ╚══════╝╚══════╝╚══════╝       ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝')

     server.on('published', function(packet, client) {

         if (client) {
           var buf = (Buffer.from(packet.payload)); //Buffer is dumped from packet
           let msg = (buf.toString()); //Buffer is converted to string
           console.log("Message from MQTT ", msg);
           /**
           * Pushing New Value
           * in the Database Object
           */
           ref.push({
               id:0,
               date:Date.now(),
               Message:msg,
           });
           /**
           * Reading Value from
           * Firebase Data Object
           */
           ref.once("value", function(snapshot) {
             var data = snapshot.val();   //Data is in JSON format.
             console.log("Message published to cloud database ", data);
           });
         };
});
});
