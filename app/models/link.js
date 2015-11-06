var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

// TODO: look into new mongoose.Schema vs mongoose.Schema
var linkSchema = mongoose.Schema({
  url: String,
  base_url: String,
  code: String,
  title: String,
  visits: Number,

});

var Link = mongoose.model('link', linkSchema);

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function(){
//     this.on('creating', function(model, attrs, options){
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

// pre is middleware that exeutes the function before save
linkSchema.pre('save', function(model, attrs, options, next){
  var shasum = crypto.createHash('sha1');
  shasum.update(linkSchema.get('url'));
  linkSchema.set('code', shasum.digest('hex').slice(0, 5));
  next();
});

module.exports = Link;
