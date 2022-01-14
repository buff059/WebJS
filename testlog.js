const async = require('async');
const request = require('request');
const fs = require('fs');

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
    console.log(typeof(results));
    fs.writeFile('datafromrequest.txt', JSON.stringify(results), function(){});
  })
  .catch(function(err) {
    console.log(err);
  });

}


async function process() {
    
  var dataLoginString = '{"email": "len1234@gmail.com", "password": "123456"}';


  var postOptions = {
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

  await delayedLog(postOptions, getOptions);
}


process();