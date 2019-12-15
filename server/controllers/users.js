const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require("../models/users");
const secret = {
    secret:'dangermouse'
}


const createUser = async (req, res) => { //done
    try {
        if (req.body.email) {
            req.body.email = req.body.email.toLowerCase();
        }
        const data = await User.create(req.body);
        jwt.sign({data},secret.secret,(err,token)=>{
            if(err) res.send(err);
            res.json({
                success: true,
                data,
                token
            });
            
        })
    } catch (error) {
        res.json({
            success: false,
            error:error.message,
        });
    }
};

const loginUser = async (req, res) => { //done
    try {

        const { email, password } = req.body;
        const data = await User.findOne({ email });
        if (!data) {
            throw new Error('User not found');
        }
        const isPasswordMatch = await bcrypt.compare(password, data.password);
        if (!isPasswordMatch) {
            res.status(401).send('Invalid login credentials')
        }
        jwt.sign({data},secret.secret,(err,token)=>{
            if(err) res.send(err);
            res.json({
                success: true,
                data,
                token
            });
            
        })

        
    } catch (err) {
        res.json({
            success: false,
            error: err.message,
        });
    }
};



const getUser = async (req, res) => { //done
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

const fetchUsers = async (req, res) => { //done
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


const updateUserDetails = async (req, res) => { //done
    try {
        jwt.verify(req.token , secret.secret , async (err,decoded)=>{
            if(err) res.send(err)
            const id  = decoded.id;
            const update = req.body;
            if (update.password !== undefined || update.password === '') {
                update.password = await bcrypt.hash(update.password, 8);
            }
            const data =await  User.findByIdAndUpdate(id, { $set: update }, { new: true });
        res.json({
            success: true,
            data,
        });
            
        }) 
        
    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            error: err.message,
        });
    }
};


const deleteUser = async (req, res) => { //done
    try {
        jwt.verify(req.token , secret.secret ,async(err,decoded)=>{
            if(err) res.send(err)
            const id = decoded.id 
            const data =await User.findByIdAndDelete(id);
            res.json({
                success: true,
                data,
            });

        })
        
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
    loginUser,
    getUser,
    fetchUsers,
    updateUserDetails,
    deleteUser,
    addUserProject
}