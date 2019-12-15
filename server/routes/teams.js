const express = require('express');
const teamHandlers = require('../controllers/teams');

const api = express.Router();


// C
api.post('/teams', teamHandlers.createTeam); 
api.post('/teams/join/:', teamHandlers.joinTeam);



// R
api.get('/teams/:id', teamHandlers.getTeam); 
api.get('/teams', teamHandlers.fetchTeams); 


// U
api.put('/teams/:id', teamHandlers.updateTeamDetails);  
// api.put('/teams/:id/addproject', teamHandlers.addTeamProject); // update team id's project

// D
api.delete('/teams/:id', teamHandlers.deleteTeam); //delete a team


module.exports = api;