// Run this to generate data.json
var fs         = require('fs')
var _          = require('underscore')
var Factory    = require('rosie').Factory
var db         = {}
var moment     = require('moment')
require('moment-precise-range-plugin')
var Mock       = require('mockjs')
var Random     = Mock.Random

/**
 * 0-name 1-title 2-desc
 * @param {number} type  
 */
function sentence(type){
  switch(type){
    case 0:
      return Random.cname()
      break
    case 1:
      return Random.cparagraph(1)
      break
    case 2:
      return Random.cparagraph()
      break
  }
}
/**
 * 0-pic 1-avator
 * @param {boolean} type 
 */
function img(type){
  var size = type ? '6*6' : '10*10'
  return Random.image(size, Random.color(), Random.color(), 'Mock')
}

var topics = ['文学','健身','军事','生活','IT','电影','']
function getrandomTopic(){
  var idx = Random.natural(0, topics.length)
  return topics[idx]
}


// Tables
db.topics   = []
db.comments = []
db.users    = []
db.votes    = []

// Factories

Factory.define('user')
  .attr('name', function() {return sentence(0)})
  .attr('psd', function() {return Random.word(5)+Random.natural()})
  .attr('avator', function() {return img(1)})
  .attr('following_count', function() {return Random.natural(0, 100)})
  .attr('follower_count', function() {return Random.natural(0, 100)})
  .attr('topic_count', function() {return Random.natural(0, 20)})
  .attr('vote_count', function() {return Random.natural(0, 100)})
  .attr('vote_join_count', function() {return Random.natural(0, 50)})
  .attr('reply_count', function() {return Random.natural(0, 50)})
  .attr('follower_count_new', function() {return Random.natural(0, 10)})
  .attr('reply_count_new', function() {return Random.natural(0, 10)})

Factory.define('topic')
  .attr('name', function(){return getrandomTopic()})
  .attr('pic', function(){return img()})
  .attr('vote_count', function(){return Random.natural(0, 200)})


Factory.define('vote')
  .attr('title', function() {return sentence(1)})
  .attr('desc', function() {return sentence(2)})
  .attr('tag', function() {return getrandomTopic()})
  .attr('complex', function() {return Random.boolean()})
  .attr('view', function() {return Random.natural(0, 500)})
  .attr('msg', function() {return Random.natural(0, 100)})
  .attr('follow', function() {return Random.natural(0, 200)})
  .attr('votelist', [])


Factory.define('voteitem')
  .attr('num', function() {return Random.natural(0, 500)})
  .attr('title', function() {return sentence(1)})
  .attr('desc', function() {return sentence(2)})
  .attr('pic', function() {return img()})

Factory.define('comment')
  .attr('content', function() {return sentence(2)})
  .attr('star', function() {return Random.natural(0, 500)})
  .attr('msg', function() {return Random.natural(0, 100)})
  .attr('time', function() {
      return moment(Random.datetime,'YYYY-MM-DD HH:mm:ss')
  })

/**
 * mock data
 */

//user
_(10).times(function () {
  var user = Factory.build('user') 
  db.users.push(user)
})

//comment
_(6).times(function() {
  var comment = Factory.build('comment')
  db.comments.push(comment)
})

//comment
_(6).times(function() {
  var topic = Factory.build('topic')
  db.topics.push(topic)
})

// vote
_(10).times(function() {
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
      fs.accessSync(path,fs.F_OK)
    }catch(e){
      return false
    }
    return true
}

// 写入文件
function writeFile(name){
  if(fsExistsSync(name)){
    fs.unlinkSync(name, function(err) {
       if (err) {
           return console.error(err)
       }
       console.log("文件删除成功！")
    })
  }
  fs.writeFileSync('./db/'+name+'.json', JSON.stringify(db[name], null, 2))
}

var fileArray = ['users','votes','comments','topics']
fileArray.forEach(function(name) {
  writeFile(name)
})


