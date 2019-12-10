const Project = require('../models/project');

const createProject = async (req, res) => {
    try {
        const data = await Project.create(req.body);

        res.json({
            success: true,
            data,
        });
    } catch (err) {
        res.json({
            success: false,
            error: err.message,
        });
    }
};

const getProject = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Project.findById(id);
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

const fetchProjects = async (req, res) => {
    try {
        let filter = req.query;
        const data = await Project.find(filter).sort({ $natural: -1 })
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


const updateProjectDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;
        const data = await Project.findByIdAndUpdate(id, { $set: update }, { new: true });
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


const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Project.findByIdAndDelete(id);
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


module.exports = {
    createProject,
    getProject,
    fetchProjects,
    updateProjectDetails,
    deleteProject
}