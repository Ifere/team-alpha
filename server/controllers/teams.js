const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Team = require('../models/teams');
const User = require("../models/users");

const createTeam = async (req, res) => {
    try {
        const data = await Team.create(req.body);

        res.json({
            success: true,
            data,
        });
    } catch (error) {
        res.json({
            success: false,
            error,
        });
    }
};

const joinTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        const user = await User.findOne({ email });
        const data = await Team.findByIdAndUpdate(id, {
            $push: { team_members: user }
        }, { new: true });
        res.json({
            success: true,
            data,
        });
    } catch (err) {
        console.log(err)
        res,json({
            success: false,
            error: err.message,
        })
    }
}

const getTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Team.findById(id);
        res.json({
            success: true,
            data,
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            error: err.message,
        });
    }
};

const fetchTeams = async (req, res) => {
    try {
        let filter = req.query;
        const data = await Team.find(filter).sort({ $natural: -1 })
        res.json({
            success: true,
            data
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            error,
        });
    }
};


const updateTeamDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;
        const data = await Team.findByIdAndUpdate(id, { $set: update }, { new: true });
        res.json({
            success: true,
            data,
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            error: err.message,
        });
    }
};


const deleteTeam = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Team.findByIdAndDelete(id);
        res.json({
            success: true,
            data,
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            error: err.message,
        });
    }
};

const addTeamProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { project_id } = req.body;
        const project = Project.findById(project_id)
        const data = await Team.findByIdAndUpdate(id,
            { $addToSet: { projects: { $each: project } } },
            { new: true });
        res.json({
            success: true,
            data,
        });
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            error: err.message
        })
    }
}

modeule.exports = {
    createTeam,
    joinTeam,
    getTeam,
    fetchTeams,
    updateTeamDetails,
    deleteTeam,
    addTeamProject
}