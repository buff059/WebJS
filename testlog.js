const axios = require('axios');

axios({
  method: 'GET',
  url: 'http://localhost:3333/api/users',
  headers: { 
    'Content-Type': 'application/json'
  }
})
.then(function (res) {
  //handle success
  console.log(res);
})
.catch(function (err) {
  //handle error
  console.log(err);
});