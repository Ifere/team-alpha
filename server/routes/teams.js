const express = require('express');
const teamHandlers = require('../controllers/teams');

const api = express.Router();


// C
api.post('/teams', teamHandlers.createTeam);   //creating a team
api.post('/teams/join/:', teamHandlers.joinTeam); //Join a team
//api.post('/teams/:id/addproject', teamHandlers.Project); // create a project for team id


// R
api.get('/teams/:id', teamHandlers.getTeam); //returns team id
api.get('/teams', teamHandlers.fetchTeams); //returns all team in the database
//api.get('/teams/:id/project',teamHandlers.getProject); //returns a list of projects for team id tbd

// U
api.put('/teams/:id', teamHandlers.updateTeamDetails);  //update team id
// api.put('/teams/:id/addproject', teamHandlers.addTeamProject); // update team id's project

// D
api.delete('/teams/:id', teamHandlers.deleteTeam); //delete a team


module.exports = api;