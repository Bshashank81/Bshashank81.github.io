function checkValidation(){
	var firstNameEntered = document.getElementById('firstName').value;
	var firstNameRegex = /[a-zA-Z]+$/;
	var valuesValidated = false;
	if(!(firstNameRegex.test(firstNameEntered))){
		alert("please enter correct first name");
		valuesValidated = false;
		return false;
	}
	else{
		valuesValidated = true;
	}

	var lastNameEntered = document.getElementById('lastName').value;
	var lastNameRegex = /[a-zA-Z]+$/;
	if(!(lastNameRegex.test(lastNameEntered))){
		alert("please enter correct last name");
		valuesValidated = false;
		return false;
	}
	else{
		valuesValidated = true;
	}	

	//phone number validation
	var phoneNumberEntered = document.getElementById('phoneNumber').value;
	var phoneNumberRegex = /[6789]{1}[0-9]{9}$/;
	if(!(phoneNumberRegex.test(phoneNumberEntered))){
		alert("please enter correct phone number");
		valuesValidated = false;
		return false;
	}
	else{
		valuesValidated = true;
	}


	//email validation
	var emailEntered = document.getElementById('email').value;
	var regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/;
	if (!(regex.test(emailEntered))){
		alert("please enter correct email");
		valuesValidated = false;
		return false;
	}
	else{
		valuesValidated = true;
	}


	if(valuesValidated === true){
		alert("all fields are correctly validated");
	}
}