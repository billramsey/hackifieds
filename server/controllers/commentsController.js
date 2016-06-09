var db = require('../../db/db');


var addComment = function(comment) {
  return new Promise(function(resolve, reject) {
    db.Comment.create(comment)
    .then(function(data) {
      //console.log('comment saved');
      resolve(data.dataValues);
      
    })
    .catch(function(error) {
      reject('error creating comment' + error);
    });
  });

};

//
//  Iterate the comment list and build a object of arrays.
//  with the key as the parentId.  All though we'll replace
//  null or undefined with top.
//  top-level comments under top.
//  each of those may have children.
/*  {
  *   top: [{text, 1, etc}, {text, 2, etc},{text, 3, etc}]
  *   1: [{text, 4, etc}, {text, 5, etc}]
  *   2: [{text, 6, etc}, {text, 7, etc}]
  * }
*/  

var arrangeCommentData = function(listOfComments) {
  //console.log('list of comments:', listOfComments);
  var commentData = {};
  for (var i = 0; i < listOfComments.length; i++) {
    var comment = listOfComments[i];
    var parentId = comment.parentId === null ? 'top' : comment.parentId;
    var comments = commentData[parentId] || [];
    comments.push(comment);
    commentData[parentId] = comments;
  }
  return commentData;

};


var listComments = function(listingId) {
  return new Promise(function(resolve, reject) {

    db.Comment.findAll({
      where: {
        listingId: listingId
      },
      raw: true
    })
    .then(function(data) {
      //console.log('comment saved');
      //console.log('data:', data);
      var commentData = arrangeCommentData(data);
      resolve(commentData);
    })
    .catch(function(error) {
      reject('error getting' + error);
    });
  });
};



var postComment = function(req, res) {
  var user = (req.user && req.user.username) ? req.user.username : undefined;
  console.log('user:', user);
  if (user === undefined) {
    var message = 'You must be logged in to comment';
    console.log(message);
    return res.status(401).json({message: message});
  }

  db.User.findOne({ where: {username: username} }).then(function(user) {
    if (user === null) {
      var message = 'non-existent user';
      return res.status(401).json({message: message});
    }
    console.log(message);
    console.log('userid:', user.userId);
    console.log('pid', req.params.parentId || 0);
    console.log('lid', req.params.listingId);
    var comment = {
      userId: user.userId,
      private: false,
      text: req.text, 
      listingId: req.params.listingId
    };
    if (req.params.parentId !== undefined) {
      comment.parentId = req.params.parentId;
    }
    addComment(comment)
    .then(function() {
      res.status(201).end();
    })
    .catch(function(err) {
      res.status(500).end();
    });

    
  });

};
var getComments = function(req, res) {
  //listingId required
  listComments(req.listingId)
  .then((results) => res.status(200).json(results))
  .catch((err) => res.status(500).json(results));
  
  //check if private checkbox checked.
};
var deleteComment = function(req, res) {
  //listingId required
  res.status(200).end();
  //check if private checkbox checked.
};

module.exports = {
  addComment: addComment,
  listComments: listComments,
  postComment: postComment,
  getComments: getComments,
  deleteComment: deleteComment
};

