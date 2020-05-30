// DOM Elements
const form = document.getElementById('pw-validator');
const submit = document.querySelector('.submit');
const password = document.querySelector('.password');
const checkpoints = document.querySelector('.checkpoints');
const charsmin = document.querySelector('#chars-min');
const charsmax = document.querySelector('#chars-max');
const digitsmin = document.querySelector('#digits-min');
const lowercasemin = document.querySelector('#lowercase-min');
const uppercasemin = document.querySelector('#uppercase-min');
const specialcharmin = document.querySelector('#special-char-min');
const pwlength = document.querySelector('.pw-length');
const inputFocus = document.querySelector('#pw-validator .wrapper');
// Password Variables
const passwordLengthMin = 8;
const passwordLengthMax = 32;

/**
 *  Password Requirements  
 * 
 *  1. 8 - 32 chars long
 *  2. 1 or more special char
 *  3. 1 or more uppercase letter
 *  4. 1 or more lowercase letter
 * 
 */
function validatePassword( str ) {
   // Regex patterns
   const regexCharDigit = /[0-9]/g;
   const regexCharSpecial = /\W+/g;
   const regexCharUppercase = /[A-Z]/g;
   const regexCharLowercase = /[a-z]/g;
   // Test regex has patterns, true or false
   const hasCharDigit = regexCharDigit.test( str );
   const hasCharSpecial = regexCharSpecial.test( str );
   const hasCharUppercase = regexCharUppercase.test( str );
   const hasCharLowercase = regexCharLowercase.test( str );
   // Show regex patterns
   const showCharDigit = str.match( regexCharDigit );
   const showCharSpecial = str.match( regexCharSpecial );
   const showCharUppercase = str.match( regexCharUppercase );
   const showCharLowercase = str.match( regexCharLowercase );
   // Length criteria
   const passwordLength = str.length;
   // Length difference
   const passwordLengthGood = ( passwordLength - passwordLengthMax );
   const passwordLengthDiffShort = ( passwordLengthMin - passwordLength );
   const passwordLengthDiffLong = ( passwordLength - passwordLengthMax );
   // Password checks, set default values
   let passwordLengthIsGood = false;
   let passwordLengthIsShort = true;
   let passwordLengthIsLong = false;
   // Set password length status when good
   if( passwordLength >= passwordLengthMin && passwordLength <= passwordLengthMax ) {
      passwordLengthIsGood = true;
      passwordLengthIsShort = false;
      passwordLengthIsLong = false;
   } 
   // Set password length status when short
   if( passwordLength < passwordLengthMin ) {
      passwordLengthIsGood = false;
      passwordLengthIsShort = true;
      passwordLengthIsLong = false;
   }
   // Set password length status when long
   if( passwordLength > passwordLengthMax ) {
      passwordLengthIsGood = false;
      passwordLengthIsShort = false;
      passwordLengthIsLong = true;
   } 

   // Validation Array of Objects for each Check
   const checklistArr = [
      {
         check: hasCharDigit,
         target: digitsmin
      },
      {
         check: hasCharSpecial,
         target:specialcharmin
      },
      {
         check: hasCharLowercase,
         target: lowercasemin
      },
      {
         check: hasCharUppercase,
         target: uppercasemin
      }
   ];


   // Add classes if input has text
   if( passwordLength > 0 ) {
      // Checks for digits, lowercase, uppercase, and specialchar to be true
      checklistArr.forEach( obj => {
         if( obj.check ) {
            if( obj.target === digitsmin || obj.target === lowercasemin ) {
               obj.target.classList.add('pass');
            } else {
               obj.target.classList.add('pass-even');
            }
         } else {
            obj.target.classList.remove('pass');
            obj.target.classList.remove('pass-even');
         }
      });
      // Remove Classes if input has no text
   } else {
      checklistArr.forEach( obj => {
         obj.target.classList.remove('pass');
         obj.target.classList.remove('pass-even');
      });
   }  

   // Validate length
   if( passwordLength === 0 ) {
      charsmin.classList.remove('pass');
      charsmax.classList.remove('pass-even');
   } else if( passwordLength >= passwordLengthMin ) {
      charsmin.classList.add('pass')
   } else if( passwordLength > 0 ) {
      charsmax.classList.add('pass-even')
   } 
   
   // Remove max if greater than max chars allowed
   if( passwordLengthIsGood ) {
      charsmax.classList.add('pass-even');
   } else {
      charsmax.classList.remove('pass-even');
   }

   
   // Display number of digits for user to see count
   if( passwordLength === 0 ) {
      pwlength.style.color = 'white';
   } else if( passwordLengthIsShort ) {
      pwlength.style.color = 'var(--warning)';
      pwlength.innerHTML = `-${passwordLengthDiffShort}`;
   } else if( passwordLengthIsGood ) {
      pwlength.style.color = 'var(--pass)';
      pwlength.innerHTML = `${passwordLength}`;
   } else if( passwordLengthIsLong ) {
      pwlength.style.color = 'var(--warning)';
      pwlength.innerHTML = `+${passwordLengthDiffLong}`;
   } else {
      pwlength.style.color = 'var(--primary)';
   }

};


// Validate onkeyup
function validateInput( str ) {
   validatePassword( str );

};

// Style Input Focus
function getfocus() {
   password.style.height = '60px';
   inputFocus.style.border = '3px solid var(--primary)'
}

function losefocus() {
   password.style.height = '64px';
   inputFocus.style.border = '1px solid var(--primary)'
   password.placeholder = 'Enter password';
}