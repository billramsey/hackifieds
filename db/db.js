// node dependencies
var Sequelize = require('sequelize');
var dbConfig = require('./dbPassword');

// create database connection

var db = new Sequelize('hackifieds', 'root', dbConfig.password, {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

// User model
var User = db.define('User', {
  userId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: Sequelize.STRING(100), allowNull: true },
  firstName: { type: Sequelize.STRING(100), allowNull: true },
  lastName: { type: Sequelize.STRING(100), allowNull: true },
  email: { type: Sequelize.STRING(100), allowNull: true },
  profilePic: { type: Sequelize.STRING(100), allowNull: true },
  phone: Sequelize.STRING(100),
  school: { type: Sequelize.STRING(100), allowNull: true },
  cohort: { type: Sequelize.STRING(100), allowNull: true }
});

// Category model
var Category = db.define('Category', {
  'categoryId': {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  'categoryName': {type: Sequelize.STRING(25), allowNull: false}
});

// Listing model
var Listing = db.define('Listing', {
  listingId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: Sequelize.STRING(100), allowNull: false },
  description: { type: Sequelize.TEXT, allowNull: false },
  location: { type: Sequelize.STRING(100), allowNull: false },
  price: { type: Sequelize.DECIMAL(10, 2) },
  startDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  endDate: { type: Sequelize.DATE },
  roomtype: { type: Sequelize.STRING(100) },
  distance: { type: Sequelize.FLOAT },
});

// Image model
var Image = db.define('Image', {
  imageId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  path: { type: Sequelize.TEXT, allowNull: false }
});

// Image model
var Comment = db.define('Image', {
  commentId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  private: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false},
  text: { type: Sequelize.STRING(255), allowNull: true },
  parentId: { type: Sequelize.INTEGER },
});


// define foreign key relationships
User.hasMany(Listing, { foreignKey: { name: 'userId', allowNull: false } });
Listing.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false } });
Category.hasMany(Listing, { foreignKey: { name: 'categoryId', allowNull: false } });
Listing.belongsTo(Category, { foreignKey: { name: 'categoryId', allowNull: false } });
Listing.hasMany(Image, { foreignKey: { name: 'listingId', allowNull: false } });
Listing.hasMany(Comment, { foreignKey: { name: 'listingId', allowNull: false } });
Image.belongsTo(Listing, { foreignKey: { name: 'listingId', allowNull: false } });
Comment.belongsTo(Listing, { foreignKey: { name: 'listingId', allowNull: false } });
Comment.belongsTo(User, { foreignKey: { name: 'userId', allowNull: false } });

// Sync database
User.sync()
  .then( function () {
    console.log( 'Created (or fetched existing) Users table.' );
  })
  .catch( function (err) {
    console.log( 'Unable to create/fetch Users table: ' + err );
  });

Category.sync()
  .then( function () {
    console.log( 'Created (or fetched existing) Categories table.' );
  })
  .catch( function (err) {
    console.log( 'Unable to create/fetch Categories table: ' + err );
  });

Listing.sync()
  .then( function () {
    console.log( 'Created (or fetched existing) Listings table.' );
  })
  .catch( function (err) {
    console.log( 'Unable to create/fetch Listings table: ' + err );
  });

Image.sync()
  .then( function () {
    console.log( 'Created (or fetched existing) Images table.' );
  })
  .catch( function (err) {
    console.log( 'Unable to create/fetch Images table: ' + err );
  });

Comment.sync()
  .then( function () {
    console.log( 'Created (or fetched existing) Comments table.' );
  })
  .catch( function (err) {
    console.log( 'Unable to create/fetch Comments table: ' + err );
  });



db.sync()
// db.sync( { force: true } ) // use this line instead of above to overwrite with new schemas
  .then( function () {
    console.log( 'Connection to hackifieds database opened' );
  })
  .catch( function (err) {
    console.log( 'Error opening hackifieds database: ' + err );
  });

module.exports = {
  User: User,
  Category: Category,
  Listing: Listing,
  Image: Image,
  Comment: Comment,
};



