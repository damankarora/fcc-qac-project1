function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;

    if(input.includes('/')){
      let fraction = '';
      
      for(let i = 0; i < input.length; i ++){
        let currectChar = input.charAt(i);
        if(!isNaN(currectChar) || currectChar === '/' || currectChar === '.'){
          fraction += currectChar;
        }        
      }
      let nums = fraction.split('/');
      
      if(nums.length === 2 && nums[0] !== 0 && nums[1] !== 0){
        return parseFloat(nums[0])/parseFloat(nums[1]);
      }else{
        throw new Error('Invalid Number');
      }

    }else{
      result = parseFloat(input);
    }

    if(isNaN(result)){
      return 1;
    }

    if(result === 0){
      throw new Error('Invalid Number');
    }

    return result;
  };
  
  this.getUnit = function(input) {
    let possible = ['gal', 'lbs', 'mi', 'l', 'kg', 'km'];
    let result = "";
    input = input.toLowerCase();
    for(let i = 0 ; i < input.length; i ++){
      if(!(input.charAt(i) === '.' || input.charAt(i) === '/') && (isNaN(input.charAt(i))) && (input.charAt(i) !== ' ')){
        result += input.charAt(i);
      }
    }  
    if(possible.includes(result)){
      if(result === 'l'){
        return result.toUpperCase();
      }
      return result;
    }else{
      throw new Error('Invalid unit');
    }
    
  };
  
  this.getReturnUnit = function(initUnit) {    
    if(initUnit !== 'L'){
      initUnit = initUnit.toLowerCase();
    }
    let given = ['gal', 'lbs', 'mi'];
    let converted = ['L', 'kg', 'km'];
    for(let i = 0 ; i < 3; i++){
      if(given[i] === initUnit){
        return converted[i];
      }
      if(converted[i] === initUnit){
        return given[i];
      }
    }
    throw new Error('Invalid unit');
  };

  this.spellOutUnit = function(unit) {    
    unit = unit.toLowerCase();
    let spellings = {
      'gal': 'gallons',
      'mi': 'miles',
      'lbs': 'pounds',
      'l': 'liters',
      'kg': 'kilograms',
      'km': 'kilometers'
    }

    if(spellings[unit]){
      return spellings[unit];
    }else{
      throw new Error('Invalid unit');
    }

    
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result = initNum;

    switch(initUnit){
      case 'L': result/=galToL; break;
      case 'kg': result/=lbsToKg; break;
      case 'lbs': result*=lbsToKg; break;
      case 'gal': result*=galToL; break;
      case 'mi': result*=miToKm; break;
      case 'km': result/=miToKm; break;
      default: throw new Error('Invalid unit');
    }
    
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;    
    return result;
  };
  
}

module.exports = ConvertHandler;
