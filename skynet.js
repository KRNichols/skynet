var mosca = require('mosca'); //MOSCA Imported
//var firebase = require('firebase');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // trust self signed certificate
var mqtt = require('mqtt'); //MQTT Imported
var client  = mqtt.connect('mqtt://localhost');//IP of the machine which the server is hosted
var SECURE_KEY = __dirname + '/tls-key.pem'; //Location of secure key
var SECURE_CERT = __dirname + '/tls-cert.pem'; //Location of Secure Cert

var settings = { //Server settings
  secure : {
    port: 8883, //Secure MQTT port
    keyPath: SECURE_KEY,
    certPath: SECURE_CERT,
    allowNonSecure: false, //Denies Nonsecure Connections
  }
};

// Set the configuration for your app
  // TODO: Replace with your project's config object
  // var config = {
  //     apiKey: "AIzaSyCdzMDnYJwquw1yIyQv2G77yy2uDFJkY8s",
  //     authDomain: "pubsub-demo-d0e04.firebaseapp.com",
  //     databaseURL: "https://pubsub-demo-d0e04.firebaseio.com",
  //     projectId: "pubsub-demo-d0e04",
  //     storageBucket: "pubsub-demo-d0e04.appspot.com",
  //     messagingSenderId: "289834859012"
  //   };
  //   firebase.initializeApp(config);
  //
  // // Get a reference to the database service
  // var database = firebase.database();

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
           //console.log(msg);
           callFIREBASE(msg);}

         })
});

function callFIREBASE(msg){
  console.log("from FIREBASE CALL" msg);
};
