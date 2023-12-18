/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/


class Calculator {
  constructor(){
    this.result = 0;
  }

  add(number){
    this.result += number;
  }

  subtract(number){
    this.result -= number;
  }

  multiply(number){
    this.result *= number;
  }

  divide(number){
    if(number == 0){
      throw new Error('Invalid Number');
    }
    this.result /= number;
  }

  getResult(){
    return this.result;
  }

  clear(){
    this.result = 0
  }

  calculate(str){
    // Removing WhiteSpaces
    const { evaluate } = require('mathjs')
    let noSpaceStr = str.split(" ").join("");
    //console.log(noSpaceStr);

    const error = new Error('Incorrect String');
    // Checking for Invalid strings(anything other than chars)
    for(let i=0;i<noSpaceStr.length;i++){
      if(noSpaceStr.charCodeAt(i) >= 40 && noSpaceStr.charCodeAt(i) <= 57){
        if(noSpaceStr.charCodeAt(i) == 44){
          throw error;
        }
      }
      else{
        throw error;
      }
    }
    //Checking for invalid Paranthesis 
    let array = [];
    for(let i=0;i<noSpaceStr.length;i++){
        if(noSpaceStr[i] == ')'){
          if(array.length == 0){
            throw error;
          }
          else{
            array.pop();
          }
        }
        if(noSpaceStr[i] == '('){
          array.push('(');
        }
    }

    if(array.length != 0){
      throw error;
    }
    const finalStr = noSpaceStr;
    const newResult = evaluate(finalStr);
    if(isFinite(newResult)){
      this.result = newResult;
    }else{
      throw error;
    }
    }
  }


//const calc = new Calculator();
//calc.calculate('10/0');
//console.log(calc.getResult());
module.exports = Calculator;