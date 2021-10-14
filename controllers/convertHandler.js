function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = parseFloat(input);
    if(isNaN(result)){return 1;}
    return result;
  };
  
  this.getUnit = function(input) {
    let result = "";
    input = input.toLowerCase();
    for(let i = 0 ; i < input.length; i ++){
      if(!(input.charAt(i) === '.') && (isNaN(input.charAt(i))) && (input.charAt(i) !== ' ')){
        result += input.charAt(i);
      }
    }  
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    let given = ['gal', 'lbs', 'mi'];
    let converted = ['l', 'kg', 'km'];
    for(let i = 0 ; i < 3; i++){
      if(given[i] === initUnit){
        return converted[i];
      }
      if(converted[i] === initUnit){
        return given[i];
      }
    }
    return 'IU';
  };

  this.spellOutUnit = function(unit) {    
    let spellings = {
      'gal': 'gallons',
      'mi': 'miles',
      'lbs': 'pounds',
      'l': 'litres',
      'kg': 'kilograms',
      'km': 'kilometers'
    }

    if(spellings[unit]){
      return spellings[unit];
    }

    return 'invalid unit';
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result = initNum;

    switch(initUnit){
      case 'l': result/=galToL; break;
      case 'kg': result/=lbsToKg; break;
      case 'lbs': result*=lbsToKg; break;
      case 'gal': result*=galToL; break;
      case 'mi': result*=miToKm; break;
      case 'km': result/=miToKm; break;
    }
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    
    return result;
  };
  
}

module.exports = ConvertHandler;
