var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

// TODO: look into new mongoose.Schema vs mongoose.Schema
var userSchema = mongoose.Schema({
  username: String,
  password: String
});

// uncomment this for bookshelf implementation
// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
  initialize: function(){
    this.on('creating', this.hashPassword);
  },
  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },
  hashPassword: function(){
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.get('password'), null, null).bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }
});

module.exports = User;
