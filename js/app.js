// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyDU01SWkJGnAM1Hv27ekul9E0MagZT-sA0",
	authDomain: "planit-041100.firebaseapp.com",
	databaseURL: "https://planit-041100.firebaseio.com",
	projectId: "planit-041100",
	storageBucket: "planit-041100.appspot.com",
	messagingSenderId: "978009145818",
	appId: "1:978009145818:web:8364d555100b53f9"
	};
		// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().enablePersistence();


var firestore = firebase.firestore();

const loadUsernameButton = document.querySelector("#loadUsernameButton");
const usernameInput = document.querySelector("#usernameInput");
const dataInput = document.querySelector("#dataInput");
const saveInputButton = document.querySelector("#saveInputButton");
const loadDataButton = document.querySelector("#loadDataButton");

loadUsernameButton.addEventListener("click",function(){
	username = usernameInput.value.toLowerCase();
	docRef = firestore.doc("users/" + username);
	console.log("Username: " + username);
	console.log(docRef);
})


saveInputButton.addEventListener("click", function() {
	const textToSave= dataInput.value;
	console.log("I am going to save " + textToSave + " to the Firestore!");
	docRef.set({
		currentGreeting : textToSave
	}).then(function() {
		console.log("Status saved!");
	}).catch(function (error) {
		console.log("error " + error);
	});
})

/*
loadButton.addEventListener("click", function() {
	docRef.get().then(function (doc) {
		if (doc && doc.exists){
			const myData = doc.data();
			outputP.innerText = myData.currentGreeting;
			console.log("previous message loaded");
		}
	}).catch(function (error) {
		console.log("errorrrrr: " + error);
	});
})
*/