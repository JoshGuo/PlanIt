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

const saveItem = document.querySelector("#saveInputButton");
const itemList = document.querySelector("#dataList");
const newItem = document.querySelector("#addItem");
const today = new Date();

////////////////////////////////////////////
//Initial Scripts
if(localStorage.username === undefined){
	console.log("no username... rerouting");
	window.location.href = "login.html";
}else {
	docRef = firestore.doc("users/" + localStorage.username);
	docRef.get().then(function (docSnap){
		if(!(docSnap.exists)){
			alert("Creating new user for " + localStorage.username);
			docRef.set({
			});
		}
	});
	console.log("Username: " + localStorage.username);
	console.log("Username loaded!");
	initializeData();
	console.log("Data Loaded!");
	document.querySelector(".left-panel").style.display = "inline-block";
	document.querySelector(".data-list-container").style.display = "inline-block";
}
document.querySelector("p").appendChild(document.createTextNode(getDay() + ", " + getMonth() + " " + today.getDate() ));
/////////////////////////////////////////////////

//FUNCTIONS

function initializeData(){
	docRef.collection("todoList").orderBy("dateSaved").get()
	.then(function(querySnapshot){
		querySnapshot.forEach(function(doc){
			console.log(doc.data());
			var li = document.createElement("LI");
			li.appendChild( createItemDiv((document.createTextNode(doc.get("eventName"))), doc.ref) );
			itemList.appendChild(li);
		});
		console.log("Items Loaded");
	}).catch(function (error) {
		alert("Error loading items: " + error);
		console.log("Error loading items: " + error);
	});
}

function createItemDiv(name, itemRef){
	//needs to be modified in the future for the different types of lists
	var itemDiv = document.createElement("DIV");
	itemDiv.className = "item";
	
	var editItemDiv = document.createElement("DIV");
	var editButton = document.createElement("BUTTON");
	editButton.innerHTML = "Edit";
	var deleteItem = document.createElement("BUTTON");
	deleteItem.innerHTML = "Remove";
	
	var editItemPropertiesDiv = document.createElement("DIV");
	var editName = document.createElement("INPUT");
	editName.defaultValue = name.wholeText;
	var saveButton = document.createElement("BUTTON");
	saveButton.innerHTML = "Save";
	
	editItemPropertiesDiv.className = "edit-item-props";
	editItemPropertiesDiv.style.display = "none";
	editItemPropertiesDiv.appendChild(editName);
	editItemPropertiesDiv.appendChild(saveButton);
	
	editItemDiv.className = "edit-menu";
	editItemDiv.appendChild(deleteItem);
	editItemDiv.appendChild(editButton);

	itemDiv.appendChild(name);
	itemDiv.appendChild(editItemDiv);
	itemDiv.appendChild(editItemPropertiesDiv);
	
	editButton.addEventListener("click", function() {
		editItemPropertiesDiv.style.display = "block";
		editItemDiv.style.display = "none";
	});
	
	//TO BE MODIFIED TO ACCOMODATE FOR MORE SETTINGS
	saveButton.addEventListener("click", function() {
		if(editName.value!= name.wholeText){
			itemRef.update({
				eventName : editName.value
			});
			itemDiv.replaceChild(document.createTextNode(editName.value), itemDiv.childNodes[0]);
			console.log("Item editted");
		}
		editItemPropertiesDiv.style.display = "none";
	});
	
	itemDiv.addEventListener("click" , function() {
		if(editItemPropertiesDiv.style.display === "none"){
			editItemDiv.style.display = "block";
			itemDiv.addEventListener("mouseleave", function() {
				editItemDiv.style.display = "none";
			});
		}
	});
	
	//Deletes document reference and deletes matching list index
	deleteItem.addEventListener("click",function() {
		console.log("Deleting " + itemRef.id + "...");
		itemRef.delete()
		.then(function () {
			console.log(itemRef.id + " deleted");			
			itemList.childNodes.forEach(function(li) {
				if (li.querySelector("div") == itemDiv) {
					console.log("Removing " + itemDiv);
					itemList.removeChild(li);
				}
			});
		}).catch(function (error) {
			console.log("Error deleting data: " + error);
		});
	});
	
	return itemDiv;
}

function getDay(){
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	return days[today.getDay()];
}

function getMonth() {
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	return months[today.getMonth()];
}

//EVENT LISTENERS
saveItem.addEventListener("click", function() {
	var itemInput = document.querySelector("#dataInput");
	const name = itemInput.value;
	itemInput.value = '';
	docRef.collection("todoList").add({
		eventName : name,
		dateSaved : new Date()
	}).then(function(itemRef) {
		console.log("Saved to the cloud! " + itemRef.id);
		var li = document.createElement("LI");
		li.appendChild( createItemDiv(document.createTextNode(name), itemRef)); 
		itemList.appendChild(li);
	}).catch(function (error) {
		console.log("error " + error);
	});
	//hide new item input fields
	document.querySelector("#newItemMenu").style.display = "none";
	
})

newItem.addEventListener("click",function() {
	document.querySelector("#newItemMenu").style.display = "block" ;
})

document.querySelector("#x").addEventListener("click", function() {
	document.querySelector("#dataInput").value = '';
	document.querySelector("#newItemMenu").style.display = "none" ;
})

document.querySelector("#logoutButton").addEventListener("click", function() {
	localStorage.removeItem("username");
	window.location.href = "login.html";
})


