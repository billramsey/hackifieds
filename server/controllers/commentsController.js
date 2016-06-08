var db = require('../../db/db');

module.exports.postComment = function(req, res) {
  console.log('pid', req.params.parentId | 0);
  console.log('lid', req.params.listingId);
  db.Comment.create(
    {text: req.text, 
    parentId: req.params.parentId | 0, 
    listingId: req.params.listingId})
  .then(function(data) {
    console.log('comment saved');
  })
  .catch(function(error) {
    console.error(error);
  });
  //listingId required
  res.status(200).end();
  //check if private checkbox checked.
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
