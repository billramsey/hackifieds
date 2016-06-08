var db = require('../../db/db');

module.exports.postComment = function(req, res) {
  var user = (req.user && req.user.username) ? req.user.username : undefined;

  if (user === undefined) {
    var message = 'You must be logged in to comment';
    console.log(message);
    return res.status(401).json({message: message});
  }

  db.User.findOne({ where: {username: username} }).then(function(user) {
    if (user === null) {
      var message = 'non-existent user';
      console.log(message);
      return res.status(401).json({message: message});
    }

    console.log('userid:', user.userId);
    console.log('pid', req.params.parentId | 0);
    console.log('lid', req.params.listingId);
    db.Comment.create(
      {
        userId: user.userId,
        private: false,
        text: req.text, 
        parentId: req.params.parentId | 0, 
        listingId: req.params.listingId})
    .then(function(data) {
      console.log('comment saved');
      //listingId required
      res.status(200).end();
    })
    .catch(function(error) {
      res.status(500).end({ message: error });
    });

  });



};
module.exports.getComments = function(req, res) {
  //listingId required
  res.status(200).end();
  //check if private checkbox checked.
};
module.exports.deleteComment = function(req, res) {
  //listingId required
  res.status(200).end();
  //check if private checkbox checked.
};
