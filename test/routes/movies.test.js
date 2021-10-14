let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

process.env.NODE_ENV = 'test';
require('../../index');
require('dotenv').config();
const {Movie} = require('../../dbconfig/config');

chai.use(chaiHttp);
const url= `http://localhost:${process.env.PORT}`;
let token;

describe('list all movies', ()=>{
    
    before(function(done) { //done=async
        
       chai.request(url+'/auth')
          .post('/login')
          .send({
              "email": "zaidamartinezjarse@gmail.com",
              "password": "123456"
            })
          .end((err,res)=>{
                token=res.body.token 
                console.log(token)
                done()
            })
        
       });

    it('should list all movies', function(done){
            chai.request(url+'/movies')
            .get('/')
            .set('token', token)
            .end((err,res)=>{
                expect(res).to.have.status(200);
                done();
            })
        })

    })




