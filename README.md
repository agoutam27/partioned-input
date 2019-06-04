# Partioned Input
This repository gives you a jquery plugin and angularjs directive to integrate multiple input fields like as OTP input.

**1. Jquery Plugin**
	

    // Initialize parted input like this
    var partedInput = $("#id").partionedInput({
      type: "text",                 // any text or number input, default is text
      size: 6,                      // Default size is 4
      styleClass: "otpinput",       // 'parted-input' is default class
      styleIdPrefix: "otp-input-",  // from 0 to size-1, id will be assined using this id as prefix, default prefix is 'input-part-'
      regex: /[a-zA-Z]/             // regex to be checked on every input
    });
    
    // Get value like this and show it in alert box
    alert(partedInput.value());
    
    // To initialize with value
    partedInput.value(<String> | <Number> | <Array>);
    
**2. AngularJS Directive**

	// Add inputParted dependency in your module
	angular.module('app', ['inputParted']);
	// Use this in html like this
	<parted-input 
		size=6 						// Default size is 4
		type="'text'" 					// any text or number input, default is text
		regex="'\\w'"					// regex to be checked on every input
		styleClass="'otpinput'"				// 'parted-input' is default class
		styleIdPrefix="'otp-input-'"			// from 0 to size-1, id will be assined using this id as prefix, default prefix is 'input-part-'
		ng-model="inputVal">
	</parted-input>
	
	// Get value in html
	Entered otp = {{inputVal}}
	
	// Get value in js and show in alert box
	alert($scope.inputVal);
	 
	// To initialize with value
	$scope.inputVal = <String> | <Number> | <Array>
