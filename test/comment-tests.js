const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const assert = chai.assert;
chai.use(chaiAsPromised);
const should = chai.should();
const expect = chai.expect;
const db = require('../db/db.js');
const comments = require('../server/controllers/commentsController');

describe('comments', function() {


  var userId = '';
  var listingId = '';
  var commentid = '';
  before(function(done) {
    var testUser = {
      'username': 'test',
      'firstName': 'first',
      'lastName': 'last',
      'email': 'email@email.com',
      'phone': '123-456-7890',
      'school': 'Hack Reactor',
      'cohort': '43'
    };

    var user = db.User.create(testUser).then(function(u) {
      console.log('userid', u.dataValues.userId);
      userId = u.dataValues.userId;


      var testListing = {
        'title': 'Shared room',
        'description': 'Shared room',
        'location': 'Nob Hill',
        'price': '1000',
        'startDate': '2016-06-01',
        'endDate': '2016-09-01',
        'userId': userId,
        'categoryId': 1
      };
      var listing = db.Listing.create(testListing).then(function(l) {
        console.log('listingId', l.dataValues.listingId);
        listingId = l.dataValues.listingId;
      
        done();
        // var testComment = {
        //   userId: userId,
        //   private: false,
        //   text: 'test comment', 
        //   listingId: listingId
        // };
        // var listing = db.Listing.create(testListing).then(function(l) {
        //   console.log('listingId', l.dataValues.listingId);
        //   commentId = l.dataValues.commentId;
        //   done();
        // });
      });

    });

  });

  after(function() {

  });


  afterEach(function() {
    db.Comment.destroy({where: {}});
  });

  it('submit a comment at the top level', function(done) {
    console.log('listingid in test', listingId);
    var comment = {
      userId: userId,
      private: false,
      text: 'my text', 
      listingId: listingId
    };

    comments.addComment(comment)
    .then(function(data) {
      data.commentId.should.not.be.null;
      done();
    })
    .catch(done);
  });

  it('submit a second level comment ', function(done) {
    console.log('listingid in test', listingId);
    var comment = {
      userId: userId,
      private: false,
      text: 'my text', 
      listingId: listingId
    };

    comments.addComment(comment)
    .then(function(data) {
      data.commentId.should.not.be.null;
      comment.text = 'subtext',
      comment.parentId = data.commentId;

      comments.addComment(comment)
      .then(function(child) {
        child.commentId.should.not.be.null;
        child.parentId.should.be.equal(data.commentId);
        done();
      })
      .catch(done);
    })
    .catch(done);
  });

  it('get comments in the proper format ', function(done) {

    var comment = {
      userId: userId,
      private: false,
      text: 'my text', 
      listingId: listingId
    };

    comments.addComment(comment)
    .then((data) => {
      comment.text = 'subtext',
      comment.parentId = data.commentId;
      comments.addComment(comment)
      .then(function(child) {
        comments.listComments(listingId)
        .then((data) => {
          console.log('returned comment data', data);
          data.top.should.be.instanceof(Array).and.have.lengthOf(1);
          done();
        })
        .catch(done);
      })
      .catch(done);
    })
    .catch(done);
  });



});

