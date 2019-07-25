const loadUsername = document.querySelector("#loadUsernameButton");
const usernameInput = document.querySelector("#usernameInput");

loadUsername.addEventListener("click", function() {
	console.log("clicked");
	var user = usernameInput.value;
	if(user === ''){
		alert("Username cannot be empty!");
		throw "Username field cannot be empty!";
	}
	localStorage.username = user;
	window.location.href = "index.html";
})