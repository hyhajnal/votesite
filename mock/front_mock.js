// Run this to generate data.json
var fs         = require('fs')
var _          = require('underscore')
var Factory    = require('rosie').Factory
var faker      = require('faker')
var db         = {}
var filepath   = 'data.json'
var moment     = require('moment')
require('moment-precise-range-plugin')

// Credit http://www.paulirish.com/2009/random-hex-color-code-snippets/
function hex() {
  return Math.floor(Math.random()*16777215).toString(16)
}

function random_num(min, max) {
  return parseInt(Math.random()*(max-min+1)+min,10)
}


// Tables
db.posts    = []
db.comments = []
db.users    = []
db.votes    = []

// Factories
Factory.define('post')
  .sequence('id')
  .attr('title', function() {return faker.lorem.sentence()})
  .attr('desc', function() {return faker.lorem.sentences(4)})
  .attr('tag', function() {return faker.name.jobArea()})
  .attr('time', function() {
    return moment.preciseDiff(faker.date.past(),faker.date.recent())
  })
  .attr('view', function() {return random_num(0, 500)})
  .attr('msg', function() {return random_num(0, 100)})
  .attr('follow', function() {return random_num(0, 200)})

Factory.define('user')
  .sequence('id')
  .attr('name', function() {return faker.name.findName()})
  .attr('psd', function() {return faker.internet.password()})
  .attr('pic', function() {return faker.image.people()})

Factory.define('vote')
  .sequence('id')
  .attr('title', function() {return faker.lorem.sentences(4)})
  .attr('time', function() {
    return moment.preciseDiff(faker.date.past(),faker.date.recent())
  })
  .attr('votelist', [])
  .attr('user', function(){
    var user = Factory.build('user')
    db.users.push(user)
    return user
  })


Factory.define('voteitem')
  .sequence('id')
  .attr('num', function() {return random_num(0, 500)})
  .attr('title', function() {return faker.name.findName()})
  .attr('desc', function() {return faker.lorem.sentences(4)})
  .attr('pic', function() {return faker.image.people()})

Factory.define('comment')
  .sequence('id')
  .attr('content', function() {return faker.lorem.sentences(4)})
  .attr('view', function() {return random_num(0, 500)})
  .attr('msg', function() {return random_num(0, 100)})
  .attr('childs', [])
  .attr('time', function() {
    return moment.preciseDiff(faker.date.past(),faker.date.recent())
  })
  .attr('from', function(){
    var user = Factory.build('user')
    db.users.push(user)
    return user
  })
  .attr('to', function(){
    var user = Factory.build('user')
    db.users.push(user)
    return user
  })



// Has many relationships
// Users
_(10).times(function () {
  var user = Factory.build('user') 
  db.users.push(user)

  // Posts
  /*_(10).times(function() {
    var post = Factory.build('post', {userId: user.id})
    db.posts.push(post)    
  })*/

})

//commentList
_(6).times(function() {

var childs = []
  _(4).times(function(){
    var child = Factory.build('comment') 
    childs.push(child)
  })

var comment = Factory.build('comment',{childs:childs})
db.comments.push(comment)

})


// postPage
_(1).times(function() {
  var user = Factory.build('user')
  _(20).times(function(){
    var postItem = Factory.build('post',{'user': user})
    db.posts.push(postItem)
  })

})

// votePage
_(1).times(function() {
  var voteList = []
  _(15).times(function(){
    var voteItem = Factory.build('voteitem')
    voteList.push(voteItem)
  })
  var vote = Factory.build('vote', {votelist: voteList})
  db.votes.push(vote)

})


//检测文件或者文件夹存在 nodeJS
function fsExistsSync(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}

function writeFile(){
  if(fsExistsSync(filepath)){
    fs.unlinkSync(filepath, function(err) {
       if (err) {
           return console.error(err);
       }
       console.log("文件删除成功！");
    });
  }

  fs.writeFileSync(filepath, JSON.stringify(db, null, 2));
}


writeFile()





//.attr('completed', function() { return _.random(1) ? true : false})

/*Factory.define('user')
  .sequence('id')
  .after(function(user) {
    var card = faker.helpers.createCard()
    _.each(card, function(value, key) {
      user[key] = value
    })
  })*/

/*Factory.define('photo')
  .sequence('id')
  .attr('title', function() {return faker.lorem.sentence()})
  .option('color', hex())
  .attr('url', [ 'color' ], function(color) {
    return 'http://placehold.it/600/' + color
  })
  .attr('thumbnailUrl', [ 'color' ], function(color) {
    return 'http://placehold.it/150/' + color
  })*/