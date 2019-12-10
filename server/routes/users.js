const express = require('express');
const userHandlers = require('../controllers/users');
const passtoken = require('../controllers/passtoken')
const api = express.Router();


// C
api.post('/users', userHandlers.createUser); 
api.post('/users/login', userHandlers.loginUser);


// R
api.get('/users', userHandlers.fetchUsers);
api.get('/users/:id', userHandlers.getUser);

// U
api.put('/users/:id',passtoken, userHandlers.updateUserDetails);
api.put('users/:id/addproject', userHandlers.addUserProject)

// D
api.delete('/users/:id',passtoken, userHandlers.deleteUser);


module.exports = api;