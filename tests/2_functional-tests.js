const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
const { response } = require('../server');
const { get } = require('superagent');

chai.use(chaiHttp);



suite('Functional Tests', function() {
    test('Sending correct data', ()=>{
        chai.request(server)
            .get('/api/convert')
            .query({ input: '10L' })
            .end((err, res) => {
                // assert.equal(res.type, 'application/json');
                assert.equal(res.status, 200);                
                assert.deepEqual(res.body, { "initNum": 10, "initUnit": "L", "returnNum": 2.64172, "returnUnit": "gal", "string": "10 liters converts to 2.64172 gallons" })
            })
    });

    test('Sending invalid unit', ()=>{
        chai.request(server)
        .get('/api/convert')
        .query({input: '32g'})
        .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.text, "invalid unit");
        });        
    })

    test('Sending invalid number', ()=>{
        chai.request(server)
        .get('/api/convert')
        .query({input: '3/7.2/4kg'})
        .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.text, "invalid number");
        })
    })
    test('Sending invalid number and unit', () => {
        chai.request(server)
            .get('/api/convert')
            .query({ input: '3/7.2/4kilograms' })
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, "invalid number and unit");
            })
    })

    test('Convert with no Number', () => {
        chai.request(server)
            .get('/api/convert')
            .query({ input: 'L' })
            .end((err, res) => {
                // assert.equal(res.type, 'application/json');
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { "initNum": 1, "initUnit": "L", "returnNum": 0.26417, "returnUnit": "gal", "string": "1 liters converts to 0.26417 gallons" })
            })
    });

    
    

});
