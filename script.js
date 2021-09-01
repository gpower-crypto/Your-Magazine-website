
// ------------------------------------------

function checkFormData()
{

  var errorMessage = checkCompulsoryFieldsValues();

  if (errorMessage.length > 0)
    alert (errorMessage);
  else
  {
    // var title = retrieveSelectedRadioButtonValue();
    var nameElement = document.getElementById ("name");
    var headingElement = document.getElementsByTagName("h1")[0];

    var confirmationMessage  = "-------------------------------------------\n";
        confirmationMessage += "Dear " + " " + nameElement.value + ", \n";
        confirmationMessage += "Thank you for signing up with us!          \n";
        confirmationMessage += "-------------------------------------------\n";
        confirmationMessage += "You will receive an email from us shortly. Thank you for registering on our site :) \n\n";
        confirmationMessage += "Have a nice day!                      \n";

    alert (confirmationMessage);
    headingElement.innerHTML = "Thank you for signing up with us!";

  }

}

// ------------------------------------------

function checkCompulsoryFieldsValues()
{
  var nameElement = document.getElementById ("name");
  var emailElement = document.getElementById ("email");
  var passwordElement = document.getElementById ("password");
  var repeatPasswordElement = document.getElementById ("repeat-password");

  var errorMessage = "";

  if (nameElement.value.trim().length <= 0)
  {
    errorMessage += "\n Invalid Name, please enter non-blank values! \n";
    nameElement.style.background = "pink";
  }
  else
    nameElement.style.background = "#f1f1f1";

  if (passwordElement.value.trim().length <= 0)
  {
    errorMessage += "\n Invalid Password, please enter non-blank values! \n";
    passwordElement.style.background = "pink";
  }
  else
    emailElement.style.background = "#f1f1f1";

  var emailAsString = emailElement.value.trim();

  if (emailAsString.length <= 0 || !isValidEmailFormat (emailAsString))
  {
    errorMessage += "\n Invalid Email, please enter non-blank email in correct format! \n";
    emailElement.style.background = "pink";
  }
  else
    emailElement.style.background = "#f1f1f1";

  var repeatPasswordString = repeatPasswordElement.value.trim();
  var passwordAsString = passwordElement.value.trim();

   if(repeatPasswordString != passwordAsString)
   {
     errorMessage += "\n Repeat Password is incorrect, please enter same password! \n";
     repeatPasswordElement.style.background = "pink";
   }

  return (errorMessage);
}

// ------------------------------------------
/*
To check for proper email format : example@organization.com, need to use regular expression. code below from stackoverflow.com
Acknowledgement : https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
*/
// ------------------------------------------

function isValidEmailFormat (value)
{
 var regularExpression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

 if (regularExpression.test(value))
    return (true)
 else
    return (false)
}


// ------------------------------------------

function resetFormData()
{
  // makes the web-page to refresh/reload  ...
  location = window.location.href;
}
