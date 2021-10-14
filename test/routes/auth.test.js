let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

process.env.NODE_ENV = 'test';
require('../../index');
require('dotenv').config();
const {User} = require('../../dbconfig/config');

chai.use(chaiHttp);
const url= `http://localhost:${process.env.PORT}`;

describe('auth', ()=>{

     before(async function() {//antes de la primera prueba borramos el usuario creado si es que existe
        const user = await User.findOne({where: {email: 'zaidamartinezjarse@gmail.com'}})
        if(user){
            await user.destroy()
            console.log("borrar user")
        }
       });

     it('should create a new user', function(done){
           chai.request(url+'/auth')
         .post('/register')
         .send({
               "name": "Zaida",
               "email": "zaidamartinezjarse@gmail.com",
               "password": '123456'
           })
         .end((err,res)=>{
             expect(res).to.have.status(200);
             done();
           })
       })
      it('if user exists with the email should throw error', function(done){
          chai.request(url+'/auth')
        .post('/register')
        .send({
            "name": "Zaida",
            "email": "zaidamartinezjarse@gmail.com",
            "password": "123456"
          })
        .end((err,res)=>{
            expect(res).to.have.status(400);
            done();
          })
      })

      it('login user', function(done){
        chai.request(url+'/auth')
      .post('/login')
      .send({
          "email": "zaidamartinezjarse@gmail.com",
          "password": "123456"
        })
      .end((err,res)=>{
          expect(res).to.have.status(200);
          done();
        })
    })
})


