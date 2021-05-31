/**
 * Treehouse FSJS Techdegree - Project Warm Up
 * Form Input Validation - JS
 * Developed by: Robert Manolis - Student Success Specialist
 *               Milwaukie, OR - 2020
 */

"use strict";


/* Variable to store form elements - You'll use these in the functions below' */
const form = document.querySelector("form");
const nameElement = document.querySelector("#name");
const email = document.querySelector("#email");
const languageTotalElement = document.querySelector('#language-total');
let languageTotal = 0;

// Don't touch ↓↓↓ - Helper function for updating the total number of languages selected
document.querySelector('#languages').addEventListener('change', e => {
  (e.target.checked) ? languageTotal++ : languageTotal--;
  languageTotalElement.innerHTML = `Total: ${languageTotal}`;
});



// YOUR CODE GOES HERE!!! Do the steps in the functions and `submit` event listener below to complete this challenge

/* Helper function to validate name input */
const nameValidator = () => {

  // 1. Create a variable named `nameValue` to store the `.value` property of the `nameElement` input and log the variable out to the console — console.log("Name value is: ", `"${nameValue}"`);
    // To see the result of this function's log statements, call this `nameValidator()` function in the `submit` handler below, 
    // and then save the file, refresh the page in the browser and click the form's submit button.
    let nameValue = document.querySelector('#name').value;
    console.log(nameValue);
  // 2. Create a variable named `nameIsValid` to store the test value for this input.
    // Since the name field's requirement is that it can't be blank, that should look something like this:
    // `const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);`.
    // That tests that there is at least a first name containing only letters, and allows for a middle and last name.
    // Log out something like this: console.log(`Name validation test on "${nameValue}" evaluates to ${nameIsValid}`);.
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue);
    console.log(`Name validation test on "${nameValue}" evaluates to ${nameIsValid}`);
  // 3. Lastly, return `nameIsValid`.
    return nameIsValid;
}


/* Helper function to validate email input */
const emailValidator = () => {

  // 1. Create a variable named `emailValue` to store the `.value` property of the `emailAddress` input and log the variable out to the console — console.log("Email value is: ", `"${emailValue}"`);
const emailValue = document.querySelector('#email').value;
console.log(emailValue);
  // 2. Create a variable named `emailIsValid` to store the test value for this input.
    // Since the email field's requirement is that it should be a validly formatted email address with a `.com` TLD, 
    // the variable should look something like this:
    // `const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);`.
    // That tests that there is a few characters for the username, followed by “@”, followed by a few more characters 
    // and a “.com” for the domain name.
    // Log out something like this: console.log(`Email validation test on "${emailValue}" evaluates to ${emailIsValid}`);.
const emailIsValid = /^[^@]+@[a-zA-Z]+\.com/i.test(emailValue);
  // 3. Lastly, return `emailIsValid`.
return emailIsValid;
}


/* Helper function to validate language section */
const languageValidator = () => {

  // 1. Create a variable named `languageSectionIsValid` to store the test value for this section, which is the total languages total value.
    // Since the language section's requirement is just that at least one language must be selected:
    // `const languageSectionIsValid = languageTotal > 0;`.
    // That tests that the `languageTotal` variable provided for you above equals an integer greater than zero.
    // Log out something like this: `console.log(`Language section validation test evaluates to ${languageSectionIsValid}`);`.
    const languageSectionIsValid = languageTotal > 0;
    console.log ('Language section validation test evaluates to ${languageSectionIsValid}');
  // 2. Lastly, return `languageSectionIsValid`.
  return languageSectionIsValid;
}



/* Submit listener on the form element */
form.addEventListener('submit', e => {
  nameValidator();
  // IMPORTANT NOTE: Firing the submit event will refresh the page and reset the form, erasing your log statements.
    // This can be prevented by calling `e.preventDefault()` here in this submit handler, or
    // by clicking on the gear icon in the upper right hand corner of the Chrome DevTools console to enter the settings menu,
    // locating the "Console" section and selecting the "Preserve log upon navigation" option.

  // IMPORTANT NOTE: If you call `e.preventDefault()` outside of a conditional, keep in mind that when this exercise is completed, 
    // the form submission should only be prevented if one or more of the required fields is invalid.  
    // Otherwise the form should be allowed to submit.  But it's okay to temporarily disrupt that behavior for testing purposes.

  // IMPORTANT NOTE: Also keep in mind that the form's submission behavior will differ depending on whether
    // this project is being live served with a server or just viewed locally in the browser.


  // Preventing form submission for testing purposes. Remove or comment out as needed and before completion
  e.preventDefault();


  // 1. Create an if statement
     if (!nameValidator()) { e.preventDefault();}
      // And log out a message saying this particular validator prevented submission
  
  // 2. Repeat the above step for the rest of your validation functions
  if (!nameValidator()) { e.preventDefault();}
  if (!nameValidator()) { e.preventDefault();}
  // And feel free to comment out or delete any log statements from the validation functions above


  // Submit handler test log - Feel free to delete this or comment it out
  console.log('Submit handler is functional!');
});



// Don't touch ↓↓↓ - Handles tab index for checkbox parent labels
[...document.querySelectorAll('#languages inputs')].forEach(cb => {
  cb.addEventListener('focus', e => cb.parentElement.classList.add('focus'));

  cb.addEventListener('blur', e => {
    const active = document.querySelector('.focus');
    if (active) active.classList.remove('focus');
  })
});