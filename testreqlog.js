const db = require('./db');
const async = require('async');
const request = require('request');

var headers = {
  'Content-type': 'application/json'
};


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


async function delayedLog(postOptions1, postOptions2, getOptions) {

  // waiting until return promise
  var requestPromisePost1 = await requestPromise(postOptions1);
  var requestPromisePost2 = await requestPromise(postOptions2);
  var requestPromiseGet = await requestPromise(getOptions);

  //only print result after implement promise function
  Promise.all([
    requestPromisePost1,
    requestPromisePost2,
    requestPromiseGet
  ])
  .then(function(results) {
    console.log(results);
  })
  .catch(function(err) {
    console.log(err);
  });

}


async function process() {
    var dataCreateString = '{"name":"Natasha", "phone":"89764527343","email": "natasha@gmail.com", "password": "1134512", "message": ""}';
    var dataLoginString = '{"email": "natasha@gmail.com", "password": "1134512"}';

    var postOptions1 = {
      method: 'POST',
      url: 'http://localhost:3333/users/create',
      headers: headers,
      body: dataCreateString
    };

    var postOptions2 = {
      method: 'POST',
      url: 'http://localhost:3333/auth/login',
      headers: headers,
      body: dataLoginString
    };

    var getOptions = {
      method: 'GET',
      url: 'http://localhost:3333/users',
      headers: headers
    };


    await delayedLog(postOptions1, postOptions2, getOptions);
}


process();