const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/users");

const createUser = async (req, res) => {
    try {
        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase();
        }
        const data = await User.create(req.body);

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

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await User.findById(id);
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

const fetchUsers = async (req, res) => {
    try {
        let filter = req.query;
        const data = await User.find(filter).sort({ $natural: -1 })
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


const updateUserDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;

        if (update.password !== undefined || update.password === '') {
            update.password = await bcrypt.hash(update.password, 8);
        }
        const data = await User.findByIdAndUpdate(id, { $set: update }, { new: true });
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


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await User.findByIdAndDelete(id);
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

const addUserProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { project_id } = req.body;
        const project = Project.findById(project_id)
        const data = await User.findByIdAndUpdate(id,
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

module.exports = {
    createUser,
    getUser,
    fetchUsers,
    updateUserDetails,
    deleteUser,
    addUserProject
}