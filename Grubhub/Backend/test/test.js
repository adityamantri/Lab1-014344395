var chai = require('chai'), chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;

it("Should check Buyer credentials and return status code", function(done){
    chai.request('http://3.15.185.248:3001')
    .post('/buyer/signInBuyer')
    .send({ "email": "san@jose.com", "password" : "san"})
    .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.have.cookie('buyer');
        done();
    });
})

it("Should check Owner credentials and return status code", function(done){
    chai.request('http://3.15.185.248:3001')
    .post('/owner/signInOwner')
    .send({ "email": "john@sjsu.com", "password" : "john"})
    .end(function (err, res) {
         
        expect(res).to.have.status(200);
        done();
    });
})
it("Should check Update Order Status by Owner and return status code", function(done){
    chai.request('http://3.15.185.248:3001')
    .post('/ownerOrder/updateOrderStatus')
    .send({
        "series":6,
        "orderStatus": "PREPAIRING"
      })
    .end(function (err, res) {
         
        expect(res).to.have.status(200);

        done();
    });
})
it("Should cookie is set for owner and return status code", function(done){
    chai.request('http://3.15.185.248:3001')
    .get('/buyer/getBuyer/6')
    .send()
    .end(function (err, res) {
         
        expect(res).to.have.status(200);
        done();
    });
})
it("Should check credentials and return status code", function(done){
    chai.request('http://3.15.185.248:3001')
    .post('/search/searchRestaurant')
    .send({ "itemName": "sushi"})
    .end(function (err, res) {
         
        expect(res).to.have.status(200);
        done();
    });
})