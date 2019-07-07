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
const dataList = document.querySelector("#dataList");

function initializeData(){
	docRef.collection("todoList").orderBy("dateSaved").get()
	.then(function(querySnapshot){
		querySnapshot.forEach(function(doc){
			console.log(doc.data());
			var eventNode = document.createTextNode(doc.get("eventName"));
			var li = document.createElement("LI");
			li.appendChild(eventNode);
			dataList.appendChild(li);
		});
	});
	
}

loadUsernameButton.addEventListener("click",function(){
	username = "joshy"; // ******** only for testing purposes ///// usernameInput.value.toLowerCase();
	docRef = firestore.doc("users/" + username);
	console.log("Username: " + username);
	console.log("username loaded!");
	initializeData();
	usernameInput.style.display = "none";
	loadUsernameButton.style.display = "none";
})

saveInputButton.addEventListener("click", function() {
	const name = dataInput.value;
	docRef.collection("todoList").add({
		eventName : name,
		dateSaved : new Date()
	}).then(function() {
		console.log("Status saved!");
		initializeData();
	}).catch(function (error) {
		console.log("error " + error);
	});
})

/*
loadDataButton.addEventListener("click", function() {
	docRef.get().then(function (doc) {
		if (doc.exists){
			const myData = doc.data();
			outputP.innerText = myData.currentGreeting;
			console.log("previous message loaded");
		}
	}).catch(function (error) {
		console.log("errorrrrr: " + error);
	});
	
})
*/
