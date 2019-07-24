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

const loadUsername = document.querySelector("#loadUsernameButton");
const usernameInput = document.querySelector("#usernameInput");
const itemInput = document.querySelector("#dataInput");
const saveItem = document.querySelector("#saveInputButton");
const itemList = document.querySelector("#dataList");
const newItem = document.querySelector("#addItem");

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
	editItemDiv.appendChild(editButton);
	editItemDiv.appendChild(deleteItem);

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

//EVENT LISTENERS

loadUsername.addEventListener("click",function(){
	//////////////////************////////////////////
	if(usernameInput.value === '')
		throw "Username field cannot be empty!";
	username = usernameInput.value.toLowerCase();
	docRef = firestore.doc("users/" + username);
	docRef.get().then(function (docSnap){
		if(!(docSnap.exists)){
			alert("Creating new user for " + username);
		}
	});
	console.log("Username: " + username);
	console.log("username loaded!");
	console.log("data");
	initializeData();
	console.log("data done!");

	document.querySelector(".login-container").style.display = "none";
	document.querySelector(".list-list-container").style.display = "inline-block";
	document.querySelector(".data-list-container").style.display = "inline-block";
})

saveItem.addEventListener("click", function() {
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

