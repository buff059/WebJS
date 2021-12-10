const axios = require('axios');

axios.post('http://localhost:3333/users/create', {
  name: 'Peter',
  phone: '89556336253',
  email: 'peterpan@gmail.com',
  password: '987654',
  message: 'Im Peter',
  headers: { 
    'Content-Type': 'multipart/form-data' 
  }
})
.then(function(res) {
  //handle success
  console.log(res);
})
.catch(function(err) {
  //handle error
  console.log(err);
});