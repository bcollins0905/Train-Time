  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCP_hSugvrDeBsOcp14_oSyAEWk8pOaZ6s",
    authDomain: "train-schedule-92b99.firebaseapp.com",
    databaseURL: "https://train-schedule-92b99.firebaseio.com",
    projectId: "train-schedule-92b99",
    storageBucket: "",
    messagingSenderId: "1033605256082"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

// var connectionsRef = database.ref('/connect');
// var connectedRef = database.ref('.info/connected');
// connectedRef.on("value", function(snap) {

// if (snap.val())	{

// 	var con = connectionsRef.push(true);
// 	con.onDisconnect().remove();
// 	}
//});


//making the click function
$("#add-train-btn").on("click", function(event) {
event.preventDefault();

//watch here for parseints and doing something special with moment on the time
//also think of creating a variable for the current time
var nameInput = $("#train-name-input").val().trim();
var destinationInput = $("#destination-input").val().trim();
var firstTrainInput = $("#first-train-input").val().trim();
var frequencyInput = $("#frequency-input").val().trim();


var newTrain = {
    name: nameInput,
    destination: destinationInput,
    firstTrain: firstTrainInput,
    trainFrequency: frequencyInput
  };
//console.log(trainFrequency + "add")
database.ref().push(newTrain);


  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-input").val("");
  $("#frequency-input").val("");

});

database.ref().on("child_added", function(childSnapshot){
var name = childSnapshot.val().name;
var destination = childSnapshot.val().destination;
//var firstTrain = childSnapshot.val().firstTrain;
var tFrequency = childSnapshot.val().trainFrequency;

var firstTrainInput = childSnapshot.val().firstTrain;
console.log(firstTrainInput + "hello");


    // Time is 3:30 AM
    var firstTime = "";
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainInput, "hh:mm").subtract(1, "years");

    // Current Time
    var currentTime = moment();
 
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    // Next Train
    var nextTrain = moment(moment().add(tMinutesTillTrain, "minutes")).format("hh:mm A")

$("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + tFrequency + "</td><td>" + tMinutesTillTrain + "</td><td>" + nextTrain + "</td></tr>"); 


})


