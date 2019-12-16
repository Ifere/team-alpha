const express = require('express');
const projectandlers = require('../controllers/project');

const api = express.Router();


// C
api.post('/projects', projectHandlers.createProject); 

// R
api.get('/projects', projectHandlers.fetchProjects);
api.get('/projects/:id', projectHandlers.getProject);

// U
api.put('/projects/:id', projectHandlers.updateProjectDetails);

// D
api.delete('/projects/:id', projectHandlers.deleteProject);


module.exports = api;