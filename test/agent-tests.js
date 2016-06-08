// queue-agent-tests.js
var request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const assert = chai.assert;
const expect = chai.expect;

//  Get the server.  Works even if not running
var app = require('../server/app.js').app;


// // just a simple test to make sure that super test works.
// describe('GET /songs', function() {
//   it('respond with json', function(done) {
//     request(app)
//       .get('/songs')
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(200, done);
//   });
// });

describe('GET comments', function() {

  before(function() {
    //  create a user with the roomid;
    //new User({username:'testqueueuser', password:'pw', roomid: roomid, queue: []})
    //.save((err, success) => done(err));
  });

  after(function() {
    //User.remove({ roomid: roomid }).then(() => done());
  });
  


  it('post comment successfully', function(done) {
    var agent = request.agent();
    request(app)
      .post('/api/addComment/1')
      .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      .expect(200)
      .send({text: 'I am a comment'})
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });


});

