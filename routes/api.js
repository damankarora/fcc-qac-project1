'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  // Endpoint

  app.get('/api/convert', (req, res)=>{
    let inputString = req.query.input;
    
    
    let invalidNumber = false;
    let invalidUnit = false;

    let inputNumber;
    let inputUnit;    

    try{
      inputNumber = convertHandler.getNum(inputString);
    }
    catch(err){
      invalidNumber = true;
    }

    try{
      inputUnit = convertHandler.getUnit(inputString);
    }
    catch(err){
      invalidUnit = true;
    }

    if(invalidNumber && invalidUnit){
      return res.send('invalid number and unit');
    }else if(invalidNumber){
      return res.send('invalid number');
    }else if(invalidUnit){
      return res.send('invalid unit');
    }

    let returnUnit = convertHandler.getReturnUnit(inputUnit);
    let convertedValue = convertHandler.convert(inputNumber, inputUnit);
    let returnString = convertHandler.getString(inputNumber, inputUnit, convertedValue, returnUnit);
    

    
    res.json({
      "initNum": inputNumber,
      "initUnit": inputUnit,
      "returnNum": convertedValue,
      "returnUnit": returnUnit,
      "string": returnString
    });

  })

};
