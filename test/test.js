const app = require('../app.js');
const request = require('supertest');
let server;

describe('GET', function(){
	  before(function(done){
		      server = app.listen(0, done);
		    })

	  after(function(done){
		      server.close(done);
		    })

	  it('respuesta contiene text/html', function(done){
		      request(server)
		      .get('/')
		      .set('Accept', 'text/html')
		      .expect('Content-Type', /html/)
		      .expect(200, done);
		    })

	  it('respuesta contiene George Orwell', function(done){
		      request(server)
		      .get('/')
		      .set('Accept', 'text/html')
		      .expect(200, /George Orwell had a farm/ig, done);
		    })

	  it('/api respuesta contiene json', function(done){
		      request(server)
		      .get('/api')
		      .set('Accept', 'application/json')
		      .expect('Content-Type', /json/)
		      .expect(200, done);
		    })

	  it('/api respuesta contiene objeto animales', function(done){
		      request(server)
		      .get('/api')
		      .set('Accept', 'application/json')
		      .expect(200, {"cat":"meow","dog":"bark","eel":"hiss","bear":"growl","frog":"croak","lion":"roar","bird":"tweet","cow":"moo"}, done);
		    })
})
