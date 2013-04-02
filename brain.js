$(document).ready(function() {
  
  /* gui display and buttons */
  var display = $("#display");
  var numberButton = $("#1, #2, #3, #4, #5, #6, #7, #8, #9, #0");
  var clearButton = $("#clear");
  var decimalButton = $("#decimal");
  var operatorButton = $("#addition, #subtraction, #multiplication, #division");
  var equalButton = $("#equal");
  /* flow states */
  var operatorIsClicked = false;
  var operationInCourse = false;
  var operationType = null;
  var resultIsGiven = false;
  /* math values */
  var figure = 0;
  var value1 = 0;
  var value2 = null;
  var result = 0;
  var decimal = false;
  var inDisplay = display.text();
  
  function evalDecimal(a) {
    if (a%1 == 0) {
      decimal = false;
    }
    else decimal = true;
    
    return decimal;
  }
  
  evalDecimal(figure);
  
  function reset() {
    display.text(0);
    operatorIsClicked = false;
    operationInCourse = false;
    operationType = null;
    figure = 0;
    value1 = 0;
    value2 = null;
    result = 0;
  }
  
  clearButton.click(function() {
    reset();
  });
  
  decimalButton.click(function() {
    if (operationInCourse) {
      if (operatorIsClicked) {
        display.text("0.");
        operatorIsClicked = false;
        decimal = true;
      }
      
      else if(!operatorIsClicked) {
        display.append(".");
        decimal = true;
      }
    }
    
    else if (!operationInCourse) {
      if (decimal == true) {
      }
    
      else {
        display.append(".");
        decimal = true;
      }
    }
  });
  
  /* math operations */
  function addition(a, b) {
    result = parseFloat(a) + parseFloat(b);
    return result;
  }
  
  function subtraction(a, b) {
    result = parseFloat(a) - parseFloat(b);
    return result;
  }
  
  function multiplication(a, b) {
    result = parseFloat(a) * parseFloat(b);
    return result;
  }
  
  function division(a, b) {
    result = parseFloat(a) / parseFloat(b);
    return result;
  }
  
  numberButton.click(function() {
    
    operatorButton.parent(".button").removeClass("selected");
    figure = $(this).attr("id");
    
    if (operationInCourse) {
      if (operatorIsClicked) {
        display.text(figure);
        operatorIsClicked = false;
      }
      
      else if (!operatorIsClicked) {
        display.append(figure);
      }
      
      inDisplay = display.text();
      evalDecimal(inDisplay);
      
      value2 = parseFloat(display.text());
      return value2;
      
    }
    
    else if (!operationInCourse) {
      if (display.text()=="0" || resultIsGiven) {
        display.text(figure);
        resultIsGiven = false;
      }
    
      else display.append(figure);
    
      inDisplay = display.text();
      evalDecimal(inDisplay);
    
      value1 = parseFloat(display.text());
      return value1;
    }
    
  });
  
  operatorButton.click(function() {
    
    operatorButton.parent(".button").removeClass("selected");
    $(this).parent(".button").addClass("selected");
    
    if (value1 != null && value2 != null) {
      switch(operationType) {
        case "addition":
          addition(value1, value2);
          break;
        case "subtraction":
          subtraction(value1, value2);
          break;
        case "multiplication":
          multiplication(value1, value2);
          break;
        case "division":
          division(value1, value2);
          break;
      }
      value1 = result;
      value2 = null;
      display.text(result);
    }
    
    inDisplay = display.text();
    evalDecimal(inDisplay);
    
    operationType = $(this).attr("id");
    operationInCourse = true;
    operatorIsClicked = true;
    
  });
  
  equalButton.click(function() {
    
    operatorButton.parent(".button").removeClass("selected");
    
    if (value1 != null && value2 != null) {
      switch(operationType) {
        case "addition":
          addition(value1, value2);
          break;
        case "subtraction":
          subtraction(value1, value2);
          break;
        case "multiplication":
          multiplication(value1, value2);
          break;
        case "division":
          division(value1, value2);
          break;
      }
      value1 = result;
      value2 = null;
      display.text(result);
    }
    
    inDisplay = display.text();
    evalDecimal(inDisplay);
    
    operationType = null;
    operationInCourse = false;
    operatorIsClicked = false;
    resultIsGiven = true;
    
  });
  
  
  
});