const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite('Reading number', function(){
        test('reading whole number', () => {            
            assert.equal(convertHandler.getNum('14l'), 14);            
        });

        test('Reading zero', ()=>{
            assert.throws(()=>{convertHandler.getNum('0mi')}, 'Invalid Number');
        })

        test('Reading decimal number', () => {
            assert.equal(convertHandler.getNum('14.1l'), 14.1);
            assert.equal(convertHandler.getNum('0.1mi'), 0.1);
        });

        test('Reading fractional values', ()=>{
            assert.equal(convertHandler.getNum('1/2km'), 0.5);
        });

        test('Reading fractional input with a decimal', ()=>{
            assert.equal(convertHandler.getNum('1.2/2gal'), 0.6);
        });

        test('Return 1 when no value is present', ()=>{
            assert.equal(convertHandler.getNum('l'), 1);
        })

        test('Should return an error for a double fraction', ()=>{
            assert.throws(() => { convertHandler.getNum('1/2/3kg') }, 'Invalid Number');
        })
        
    })

    suite('Reading input Unit', ()=>{

        suite('Reading each unit correctly', ()=>{
            test('lowercase litres', ()=>{
                assert.equal(convertHandler.getUnit('14l'), 'L');
            });
            
            test('uppercase litres', ()=>{
                assert.equal(convertHandler.getUnit('14L'), 'L');
            })

            test('lowercase miles', ()=>{
                assert.equal(convertHandler.getUnit('14mi'), 'mi');
            })

            test('uppercase miles', ()=>{
                assert.equal(convertHandler.getUnit('14MI'), 'mi');
            })

            test('Capitalized miles', ()=>{
                assert.equal(convertHandler.getUnit('14Mi'), 'mi');
            })

            test('Gallons', ()=>{
                assert.equal(convertHandler.getUnit('14gal'), 'gal');
            })

            test('Kilometers', ()=>{
                assert.equal(convertHandler.getUnit('14km'), 'km');
            });

            test('Pounds', ()=>{
                assert.equal(convertHandler.getUnit('14lbs'), 'lbs');                
            })

            test('Kilograms along with decimals', ()=>{
                assert.equal(convertHandler.getUnit('13.1kg'), 'kg');
            })

            test('unit with fractions', ()=>{
                assert.equal(convertHandler.getUnit('14/2l'), 'L');
            })

        })

        suite('Sending invalid units', ()=>{
            test('Sending invalid units', ()=>{
                assert.throws(()=>{convertHandler.getUnit('12likes')}, 'Invalid unit');
            });
            test('Sending no units', ()=>{
                assert.throws(()=>{convertHandler.getUnit('12')});
            })
            
            test('Sending invalid characters', ()=>{
                assert.throws(()=>{
                    convertHandler.getUnit('12@fdk');
                })
            })
        })

        suite('Spelled out units', ()=>{

            test('Wrong input', ()=>{
                assert.throws(()=>{convertHandler.spellOutUnit('pikachu')}, 'Invalid unit');
            })

            test('kg', ()=>{
                assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
            });

            test('KG', () => {
                assert.equal(convertHandler.spellOutUnit('KG'), 'kilograms');
            });

            test('mi', () => {
                assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
            });

            test('gal', () => {
                assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
            });

            test('l', () => {
                assert.equal(convertHandler.spellOutUnit('l'), 'liters');
            });

            test('km', () => {
                assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
            });

            test('lbs', () => {
                assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
            });
            
        })

    });

    suite('Converting to return units', () => {
        test('gal to L', () => {
            assert.equal(convertHandler.getReturnUnit('gal'), 'L');
        });

        test('L to gal', () => {
            assert.equal(convertHandler.getReturnUnit('L'), 'gal');
        });

        test('mi to km', () => {
            assert.equal(convertHandler.getReturnUnit('mi'), 'km');
        });

        test('km to mi', () => {
            assert.equal(convertHandler.getReturnUnit('km'), 'mi');
        });

        test('lbs to kg', () => {
            assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
        });

        test('kg to lbs', () => {
            assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
        });
    })

    suite('Converting measures', ()=>{
        suite('Converting whole number measures', ()=>{
            test('Litre to Gallon', ()=>{
                assert.equal(convertHandler.convert(2, 'L'), 0.52834);
            });

            test('Gallon to Litre', ()=>{
                assert.equal(convertHandler.convert(2, 'gal'), 7.57082);
            });

            test('Mile to Kilometer', ()=>{
                assert.equal(convertHandler.convert(2, 'mi'), 3.21868);
            });

            test('Kilometer to Mile', ()=>{
                assert.equal(convertHandler.convert(2, 'km'), 1.24275);
            });

            test('Pound to Kilogram', ()=>{
                assert.equal(convertHandler.convert(2, 'lbs'), 0.90718);
            });

            test('Kilogram to Pound', ()=>{
                assert.equal(convertHandler.convert(2, 'kg'), 4.40925);
            });

        })

        suite('Converting decimal number measures', () => {
            test('Litre to Gallon', () => {
                assert.equal(convertHandler.convert(2.12, 'L'), 0.56005);
            });

            test('Gallon to Litre', () => {
                assert.equal(convertHandler.convert(2.12, 'gal'), 8.02507);
            });

            test('Mile to Kilometer', () => {
                assert.equal(convertHandler.convert(2.12, 'mi'), 3.41180);
            });

            test('Kilometer to Mile', () => {
                assert.equal(convertHandler.convert(2.12, 'km'), 1.31731);
            });

            test('Pound to Kilogram', () => {
                assert.equal(convertHandler.convert(2.12, 'lbs'), 0.96162);
            });

            test('Kilogram to Pound', () => {
                assert.equal(convertHandler.convert(2.12, 'kg'), 4.67380);
            });

        })
    })

});