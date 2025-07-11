const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');
const redisclient = require("../utils/redisclient");

exports.register = async (req, res) =>{
    try{ 
        const {
            name,
            email,
            password,
            age,
            dob,
            contact
            } = req.body;
        const existing = await User.findOne({email});
        if(existing){
            return res.status(400).json({message: 'Email already exists'});
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashed, age, dob, contact,});

        const token = generateToken(user._id);
        await redisclient.set(token, user._id.toString(), {
            EX: 60*60*24,
        })
        res.status(201).json({token});
    }catch (err){
        console.error("Registration error:", err);
        res.status(500).json({message: "Server error"});
    }
};

exports.login = async(req,res) => {
    try { 
        const {email, password} = req.body;

        const user = await User.findOne({email});
        const valid = user && (await bcrypt.compare(password, user.password));
        if(!valid){
            return res.status(401).json({ message: 'Invalid email or password'});
        }

        const token = generateToken(user._id);
        await redisclient.set(token, user._id.toString(),{
            EX: 60 * 60 * 24,
        });
        res.json({token});
    }catch (err) {
        console.error("Login error:",  err);
        res.status(500).json({ message: "Server error"});
    }
};

exports.getProfile = async (req, res) => {
    try{ 
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch (err){
        console.error("Get profile error:", err);
        res.status(500).json({message: "Server error"});
    }
};

exports.updateProfile = async(req, res) => {
    try{ 
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        const fields = ['name', 'age', 'dob', 'contact'];
        fields.forEach((f) =>{
            if(req.body[f]) user[f] = req.body[f];
        });

        const updated = await user.save();
        res.json({message: 'Updated Successfully', user: updated});
    }catch (err) {
        console.error("Update profile error:", err);
        res.status(500).json({message: "Server error"});
    }
};