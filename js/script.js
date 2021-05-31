document.querySelector("#name").focus();
//hide other job role field until user selects 'other' as their option
const otherJob = document.querySelector('#other-job-role');
otherJob.style.display = 'none';

document.querySelector("#title").addEventListener('change', (e) => {
    if(e.target.value == 'other'){
        otherJob.style.display = 'block';
    }
  });
//============== T-SHIRT INFO FIELDSET
//disable or enable certain colour options based on design choice
const colorField = document.querySelector("#color");
const colorOptions = document.querySelectorAll('#color option');
const designField = document.querySelector("#design");
colorField.disabled = true;

designField.addEventListener('change', (e) => {
    colorField.disabled = false;
    for (i = 0; i < colorOptions.length; i++) {
        //reset color field to show all options and instruction message as selected
        colorOptions[i].style.display = 'block';
        colorOptions[0].innerHTML = 'Select a color';
        colorOptions[0].selected = 'true';
    }
    let designChoice = e.target.value;
    //iterate over all color options and test if they have the same value as chosen in design field
    for (i = 0; i < colorOptions.length; i++) {
        let dataValue = colorOptions[i].getAttribute('data-theme');
        if(dataValue == designChoice){
            colorOptions[i].style.display = 'block';
        } else{
            colorOptions[i].style.display = 'none';
        }
    }
});

//============== ACTIVITIES FIELDSET
const activities = document.querySelector("#activities-box");
const activitiesInputs = document.querySelectorAll("#activities-box input");
let activityNumber = 0;
let totalElement = document.querySelector('#activities-cost');
let totalPrice = 0;
//let checked = false;
let alreadyChecked = 0;
// function to test if any checkboxes have been checked
// function checkActivities(){
//     for(let i = 0; i < activitiesInputs.length; i++){
//         if (activitiesInputs[i].checked == true){checked = true; console.log("true"); break;}
//     }
//     console.log(checked);
// }

// listen for changes in activities selection - update the total price and run 
activities.addEventListener('change', (e) => {
    
    let activityPrice = e.target.getAttribute('data-cost');
    activityNumber = parseInt(activityPrice);
    (e.target.checked) ? totalPrice = totalPrice + activityNumber : totalPrice = totalPrice - activityNumber;
    totalElement.innerHTML = `Total: $${totalPrice}`;
    if (alreadyChecked == 1){
        //change error state on change if user unclicks or clicks again
        if (totalPrice > 0) { 
            validationPass(activities);
        } 
        else{
            validationFail(activities);
            e.preventDefault();     
            //reset checked activitites count
            totalNumber = 0; 
        }
    }
    alreadyChecked = 1;
});


//============== PAYMENT FIELDSET
const payPalSection = document.querySelector("#paypal");
const bitCoinSection = document.querySelector("#bitcoin");
const paymentSelect = document.querySelector("#payment");
const paymentOptions = Array.from(document.querySelectorAll("#payment option"));
const ccBox = document.querySelector('.credit-card-box');
let optionToFocus = "";
//hide paypal & bitcoin sections initially until they are chosen by user
payPalSection.style.display = "none";
bitCoinSection.style.display = "none";

//make payment options field focus on credit card initially
function getVal(value) {
    //iterate through array of options and test for value method = 'credit-card'. When it's found set it to selected
    for (let i = 0; i < paymentOptions.length; i++) {
        if (paymentOptions[i].value == value) {
            let optionToFocus = paymentOptions[i];
            optionToFocus.selected = 'selected';
        } 
    }
}
getVal('credit-card');
 
//listen for changes and hide all options except chosen option
const paymentSections = document.querySelectorAll(".payment-methods>div");
paymentSelect.addEventListener('change', (e) => {
    for(let i = 0; i < paymentSections.length; i++){
        //hide all payment divs except payment-method-box so users can update their choice
        if(paymentSections[i].className !== "payment-method-box"){
            paymentSections[i].style.display = 'none';
        }
        // display the user's choice
        if(paymentSections[i].id == e.target.value){
            paymentSections[i].style.display = 'block';
        }
    }

});

//============== FORM VALIDATION
const nameValue = document.querySelector('#name').value;
const form = document.querySelector("form");
const nameField = document.querySelector('#name');
const emailField = document.querySelector('#email');

// helper functions for validation
function checkName(){
    let nameValue = document.querySelector('#name').value;
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
    // return either true or false
    return nameIsValid;
}
function checkEmail(){
    let emailValue = document.querySelector('#email').value;
    const emailIsValid = /^[^@]+@[a-zA-Z]+\.com/.test(emailValue);
    // return either true or false
    return emailIsValid;
}

//validate credit card information
let ccNumBox = document.querySelector('#cc-num');
let zipBox = document.querySelector('#zip');
let cvvBox = document.querySelector('#cvv');


// listen for submit button click and check validations
form.addEventListener('submit', (e) => {
    let ccNum = ccNumBox.value;
    let zip = zipBox.value;
    let cvv = cvvBox.value;
    
    if (totalPrice > 0) { 
        validationPass(activities);
    } 
    else{
        validationFail(activities);
        e.preventDefault(); 
        }
    //reset checked activitites count
    totalNumber = 0; 

        //if checkName function returns false - prevent form submitting and display error class on name field's parent by running validationFail function
        if (!checkName()) { 
            e.preventDefault(); 
            validationFail(nameField);
        } 
        else{
            validationPass(nameField);
        }
    
        if (!checkEmail()) { 
            e.preventDefault();
            validationFail(emailField);
        } 
        else{
            validationPass(emailField);
        }

    
// function to validate the credit card fields and display error message if user submits without correct details
function checkAllCc(){ 
    const ccIsValid = /^[0-9]{13}(?:[0-9]{3})?$/.test(ccNum);
    if(ccIsValid == false){
        validationFail(ccNumBox);
        e.preventDefault(); 
    }
    else{
        validationPass(ccNumBox);
    }

    const zipIsValid = /^[0-9]{5}$/.test(zip);
    if(zipIsValid == false){
        e.preventDefault();
        validationFail(zipBox);
    }
    else{
        validationPass(zipBox);
    }

    const cvvIsValid = /^[0-9]{3}$/.test(cvv);
    if(cvvIsValid == false){
        e.preventDefault();
        validationFail(cvvBox);
    }
    else{
        validationPass(cvvBox);
    }
    if(ccIsValid == false || zipIsValid == false || cvvIsValid == false){
        return false;
    }
}
    // only run credit card checks if 'credit card' is selected
    if (paymentSelect.value == 'credit-card'){
        checkAllCc();
    }
});


//============== ACCESSIBILITY

// toggle focus state on activities elements using validationPass & validationFail functions
activities.addEventListener("focusin", (e) => {
    e.target.parentNode.classList.add('focus');
});
activities.addEventListener("focusout", () => {
    document.querySelector(".focus").classList.remove('focus');
});

// add 'valid' or 'invalid' state to elements when called by listeners
function validationPass(element){
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = "none";
}
function validationFail(element){
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = "block";
}
