
//Use the .focus() method on the <input type="text"> element for the "Name" field.
//First, use querySelector to get the name element， using a tag bc name is an ID

const nameTag = document.querySelector(`#name`);
nameTag.focus();

//"Job Role" section
//Hide the "text field" with the id of "other-job-role" so it is not displayed when the form first loads.
//To do this, first use the querySelector to get the ID elements of other-job-role
const otherJob = document.querySelector(`#other-job-role`);
otherJob.style.display='none';
//to make it associated with user behavior in the title option, we need to make a variable that points to the option bar
const selectOptions = document.querySelector(`#title`);

//console.log(selectOptions);
//console.log(selectOptions.length);
//now we create an event listener in order to Hide the "text field" with the id of "other-job-role" so it is not displayed when the form first loads.
selectOptions.addEventListener(`change`, e => {
   for (let i=0; i<selectOptions.length;i++){
      if (e.target.value==='other'){
         otherJob.style.display='block';
         otherJob.focus();
      //if the user clicks another option after clicking "other", the other job text field should go away
      }else{
         otherJob.style.display='none';
      }
   }
})

//"T-Shirt Info" section
//Disable the "Color" <select> element. (resource: https://stackoverflow.com/questions/15602140/how-to-style-disabled-options-in-a-form/25806984)
const colorOptions = document.querySelector(`#color`);
colorOptions.disabled = true;
//Program the "Design" <select> element to listen for user changes. When a change is detected:
const designOptions = document.querySelector(`#design`);

designOptions.addEventListener(`change`, e => {
   //The "Color" <select> element should be enabled.
   colorOptions.disabled = false;
  //The "Color" <select> element should display an available color.
  //The "Color" dropdown menu should display only the color options associated with the selected design. For example:
   //for loop to go through every color option
  for (let i=0; i<colorOptions.length;i++){
      //the names of the designs are stored in "option value" portion of the design element
      //the names of the designs are also stored in "option data-theme" portion of the color element
      //compare each and only display the matching options
      if(e.target.value===colorOptions[i].getAttribute('data-theme')){
         colorOptions[i].hidden=false;
      }else{
         colorOptions[i].hidden=true;
      }

   }
})



//"Register for Activities" section
const activitiesOptions = document.querySelector('#activities');
//console.log(activitiesOptions);


let totalCost = document.querySelector('#activities-cost');


//If an activity is checked, the total cost should increase by the value in the data-cost attribute of the activity’s <input type="checkbox"> element.
let costNumber=0;
let checkedBoxes=0;
activitiesOptions.addEventListener(`change`, e => {
   if (e.target.checked===true){
      costNumber+=parseInt(e.target.getAttribute('data-cost'));
      checkedBoxes++;
   }else{//If an activity is unchecked, the total cost should decrease by that amount.
      costNumber-=parseInt(e.target.getAttribute('data-cost'));
      checkedBoxes--;
   }

   //The <p> element with the id of "activity-cost" below the activities section should update to reflect the chosen activities' total cost.
   totalCost.innerHTML=`Total: $${costNumber}`;
   //console.log(checkedBoxes);
})


//"Payment Info" section
//task: The credit card payment option should be selected for the user 
//by default. So when the form first loads, "Credit Card" should be 
//displayed in the "I'm going to pay with" <select> element
const paymentSection = document.querySelector(`#payment`);
paymentSection.innerHTML=`
<option value="credit-card">Credit Card</option>
<option value="paypal">PayPal</option>
<option value="bitcoin">Bitcoin</option>
`

//And when the user selects one of the payment options 
//from the "I'm going to pay with" drop down menu, the form 
//should update to display only the chosen payment method section.
//const payment = document.querySelector(`#payment-method-box`);
let creditCardchecked=true;
const creditCard = document.querySelector(`#credit-card`);
const payPal = document.querySelector(`#paypal`);
const bitCoin = document.querySelector(`#bitcoin`);
payPal.style.display='none';
bitCoin.style.display='none';
paymentSection.addEventListener(`change`, e => {
   creditCardchecked=false;
   creditCard.style.display='none';
   payPal.style.display='none';
   bitCoin.style.display='none';
   if(e.target.value.localeCompare('paypal')===0){
      paypal.style.display='block';
   }else if(e.target.value.localeCompare('bitcoin')===0){
      bitCoin.style.display='block';
   }else{
      creditCardchecked=true;
      creditCard.style.display='block';

   }


})


const activitiesBoxes = document.querySelector('#activities-box');


//Form validation
//
let validity=0;
//Program the form element to listen for the submit event
const form = document.querySelector(`form`);
form.addEventListener('submit', e => {
   //regex resource lookup: https://stackoverflow.com/questions/494035/how-do-you-use-a-variable-in-a-regular-expression
   //The "Name" field cannot be blank or empty.
   const nameReg = new RegExp(/^\s+$/);
   const nameInput = document.querySelector(`#name`);
   validity+=nameElementCheck(nameInput.value, emailReg);


   //The "Email Address" field must contain a validly formatted email address. The email address does not need to be a real email address, just formatted like one. 
   const emailReg= new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
   const emailInput = document.querySelector(`#email`);
   validity+=elementCheck(emailInput.value, emailReg);

   //The "Register for Activities" section must have at least one activity selected.
   if(checkedBoxes>0){
      validity+=0;
   }else if(checkedBoxes<1){
      validity+=1;
   }

   //If and only if credit card is the selected payment method:
   if(creditCardchecked){
      //The "Card number" field must contain a 13 - 16 digit credit card number with no dashes or spaces. The value does not need to be a real credit card number.
      const cardnReg = new RegExp(/^\d{13,16}$/);
      const cardnInput = document.querySelector(`#cc-num`);
      validity+=elementCheck(cardnInput.value, cardnReg);

      //The "Zip code" field must contain a 5 digit number.
      const zipReg = new RegExp(/^\d{5}$/);
      const zipInput = document.querySelector(`#zip`);
      validity+=elementCheck(zipInput.value, zipReg);

      //The "CVV" field must contain a 3 digit number.
      const cvvReg = new RegExp(/^\d{3}$/);
      const cvvInput = document.querySelector(`#cvv`);
      validity+=elementCheck(cvvInput.value, cvvReg);
   }

   //Only call `preventDefault` on the `event` object if one or more of the required fields is invalid.
   if (validity>0){
      //console.log("CANNOT SUBMIT!")
      e.preventDefault();
   }


})

//A recommended approach is to create helper functions for each of the required fields to be validated.
function elementCheck(element, regexInput){
   //If a required form field or section is valid:
   if(regexInput.test(String(element).toLowerCase())){
      //Add the ‘.valid’ className to the parent element of the form field or section.
      element.parentElement.classList.add('valid');
      //Remove the ‘.not-valid’ className from the parent element of the form field or section.
      element.parentElement.classList.remove('not-valid');
      //Hide the .hint element associated with that element.
      element.parentElement.lastElementChild.style.display = 'none';
      return 0;
   }else{//if a required form field or section is invalid
      //Add the ‘.not-valid’ className to the parent element of the form field or section. 
      element.parentElement.classList.add('not-valid');
      //For the activity section, the parent element would be the fieldset element for the activity section. 
      //For the other required inputs, the parent element would be a label element for the input.

      //Remove the ‘.valid’ className from the parent element of the form field or section.
      element.parentElement.classList.remove('valid');


      //Display the .hint element associated with the form field or section, 
      //which will be the last child of the parent element of the form field or section. 
      //The parentElement and lastElementChild properties will be helpful here.
      element.parentElement.lastElementChild.style.display = 'block';
      
      return 1;
   }
}

//the regex I set here for name is the regex for white spaces and blank input, so the logic shall 
//be reversed compared with the normal check function above
function nameElementCheck(element, regexInput){
   //If a required form field or section is valid:
   if(!regexInput.test(String(element).toLowerCase())){
      //Add the ‘.valid’ className to the parent element of the form field or section.
      element.parentElement.classList.add('valid');
      //Remove the ‘.not-valid’ className from the parent element of the form field or section.
      element.parentElement.classList.remove('not-valid');
      //Hide the .hint element associated with that element.
      element.parentElement.lastElementChild.style.display = 'none';
      return 0;
   }else{//if a required form field or section is invalid
      //Add the ‘.not-valid’ className to the parent element of the form field or section. 
      element.parentElement.classList.add('not-valid');
      //For the activity section, the parent element would be the fieldset element for the activity section. 
      //For the other required inputs, the parent element would be a label element for the input.

      //Remove the ‘.valid’ className from the parent element of the form field or section.
      element.parentElement.classList.remove('valid');


      //Display the .hint element associated with the form field or section, 
      //which will be the last child of the parent element of the form field or section. 
      //The parentElement and lastElementChild properties will be helpful here.
      element.parentElement.lastElementChild.style.display = 'block';
      
      return 1;
   }
}


//Accessibility
//Program all of the activity checkbox input elements to listen for the focus and blur events.
const checkBox = document.querySelectorAll('input[type="checkbox"]');
checkBox.forEach( object => {
   object.addEventListener('focus', e => {
   //console.log('add element!');
   //When the focus event is detected, add the ".focus" className to the checkbox input’s parent label element.
   e.target.parentElement.classList.add('focus');
   
 })
   object.addEventListener('blur', e => {
   //console.log('delete element!');
   //When the blur event is detected, remove the .
   //focus className from the label element that possesses it. 
   //It can be helpful here to directly target the element with the className of .focus in order to remove it.
   const focusElement = document.querySelector('.focus');
   if (focusElement) focusElement.classList.remove('focus');
 })
});

//Make the form validation errors obvious to all users.

