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

var firestore = firebase.firestore();
var activeList = "todoList";

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
	console.log("username detected");
	docRef = firestore.doc("users/" + localStorage.username);
	docRef.get().then(function (docSnap){
		if(!(docSnap.exists)){
			console.log("docsnap exists? " + docSnap.exists);
			alert("Creating new user for " + localStorage.username);
			docRef.set({
				name : localStorage.username
			});
			firestore.doc("users/" + localStorage.username + "/lists/todoList").set({
				type : "0",
				dateCreated : new Date()
			}).then(function(){
				location.reload()
			});
		}
	});
	console.log("Username: " + localStorage.username);
	//KNOWN BUG: todoList does not pop up upon first initialization
	initializeData();
	console.log("Data Loaded!");
	document.querySelector(".left-panel").style.display = "inline-block";
	document.querySelector(".data-list-container").style.display = "inline-block";
	document.querySelector("p").appendChild(document.createTextNode(getDay() + ", " + getMonth() + " " + today.getDate() ));
}
/////////////////////////////////////////////////

//FUNCTIONS

function initializeData(){
	//Loading items//
	console.log("initializeData()");
	displayPlan();
	//loading plans
	docRef.collection("lists").orderBy("dateCreated").get()
	.then(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {
			console.log(doc.id);
			var li = document.createElement("LI");
			li.appendChild( createPlanDiv(doc.id));
			document.querySelector("#listul").appendChild(li);
		});
	}).catch(function(error){
		console.log("Error loading plans: " + error);
	});
}

function displayPlan() {
	docRef.collection("lists/").doc(activeList).get()
	.then(function(doc) {
		var header;
		switch (doc.get("type")) {
			case "0":	
				console.log("Loading a general list..." + activeList);
				header = generateHeader(0);
				docRef.collection("lists/" + activeList +"/items").orderBy("dateSaved").get()
				.then(function(querySnapshot){
					var dataList = document.createElement("UL");
					dataList.className = "data-list";
					document.querySelector(".list-content").appendChild(dataList);
					querySnapshot.forEach(function(doc){
						var li = document.createElement("LI");
						li.appendChild( createItemDiv((document.createTextNode(doc.get("eventName"))), doc.ref) );
						dataList.appendChild(li);
					});
				});
				break;
			case "1":
				console.log("Loading a checklist...");
				header = generateHeader(1);
				break;
			case "2":	
				break;
			case "3":	
				break;
			case "4":	
		}
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

function createPlanDiv(planName) {
	var planDiv = document.createElement("DIV");
	planDiv.className = "plan-div";
	planDiv.appendChild(document.createTextNode(planName));
	//
	planDiv.addEventListener("click", function() {
		if(activeList === planName) {}
		else{
			activeList = planName;
			document.querySelector(".list-content").innerHTML = '';
			displayPlan();
		}
	});
	
	return planDiv;
}

function generateHeader(){
	
}

function getDay(){
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	return days[today.getDay()];
}

function getMonth() {
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	return months[today.getMonth()];
}

//EVENT LISTENERS//////////////////////////////

saveItem.addEventListener("click", function() {
	var itemInput = document.querySelector("#dataInput");
	const name = itemInput.value;
	itemInput.value = '';
	docRef.collection("lists/" + activeList + "/items").add({
		eventName : name,
		dateSaved : new Date()
	}).then(function(itemRef) {
		console.log("Saved to " + activeList + "! " + itemRef.id);
		var li = document.createElement("LI");
		li.appendChild( createItemDiv(document.createTextNode(name), itemRef)); 
		itemList.appendChild(li);
	}).catch(function (error) {
		console.log("error " + error);
	});
	//hide new item input fields
	document.querySelector("#newItemMenu").style.display = "none";
});	

newItem.addEventListener("click",function() {
	document.querySelector("#newItemMenu").style.display = "block" ;
	document.querySelector("#itemmenu-x").addEventListener("click", function() {
		document.querySelector("#dataInput").value = '';
		document.querySelector("#newItemMenu").style.display = "none" ;
	});
})

document.querySelector("#logoutButton").addEventListener("click", function() {
	localStorage.removeItem("username");
	window.location.href = "login.html";
})

document.querySelector("#newPlanButton").addEventListener("click", function() {
	document.querySelector(".new-plan-menu").style.display = "block";
	document.querySelector("#planmenu-x").addEventListener("click", function() {
		document.querySelector("#planInput").value = '';
		document.querySelector(".new-plan-menu").style.display = "none" ;
	});
	//PLACE HOLDER FOR REAL FUNCTIONAL PLAN ADDING //
})

document.querySelector("#savePlanButton").addEventListener("click", function() {		
	const planName = document.querySelector("#planInput").value;
	docRef.collection("lists").doc(planName).set({
		type : document.querySelector('input[name="plantype"]:checked').value,
		dateCreated : new Date()
	}).then(function() {
		var li = document.createElement("LI");
		li.appendChild( createPlanDiv(planName) );
		document.querySelector("#listul").appendChild(li);
		//hide inputs
		document.querySelector("#planInput").value = '';
		document.querySelector(".new-plan-menu").style.display = "none" ;		
	});	
})


