const userModel = require("../Models/UserModel")
const bcrypt = require("bcrypt")
const mailUtil = require("../Utils/MailUtil")

const addUser = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(req.body.password, salt)
        req.body.password = hashPassword
        const add = await userModel.create(req.body)

        const message = "<h1>Welcome to Wear-Share Family "
        + req.body.name +
        "!</h1><br/><p>We're thrilled to have you join our community. WearShare is all about sharing and caring. Start exploring now and make a difference!</p><button><a href='https://localhost:5173/'>Get Started</a></button><br><p>If you have any questions, feel free to reach out at <a href='mailto:support@wearshare.com' style='text-decoration:underline;color:blue;'>support@wearshare.com</a>.</p>";
        console.log(add)
        res.status(201).json({
            message: 'data added...',
            data: add
        })
        await mailUtil.sendMail("wippibuheuwe-6445@yopmail.com","Welcome to WearShare",message)
    } catch (err) {
        console.log(err)
        res.json({
            message : 'User already exist'
        })
    }
}

const signIn = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        console.log(email, password)
        const user = await userModel.findOne({ email: email }).populate("role")
        console.log(user)

        if(user == null){
            res.status(202).json({
                message:'email not exist'
            })
        }

        if (user != null) {
            const isMatch = bcrypt.compareSync(password, user.password)
            console.log(isMatch)
            if (isMatch == true) {
                res.status(200).json({
                    message: 'login successfully',
                    data: user
                })
            }else{
                res.status(202).json({
                    message:'Invalid credentials'
                })
            }
        }

    } catch (err) { console.log(err) }
}

const getProfileById = async(req,res) => {
    try{
        const id = req.params.id
        const data = await userModel.find({_id : id})
        res.status(200).json({
            "message":"data fetched...",
            data : data
        })
    }catch(err){
        res.status(500).json({
            "message":"Internal server error"
        })
        console.log(err)
    }
}

const updateProfile = async(req,res) => {
    try{
        const id = req.params.id
        const data = req.body
        const updatedData = await userModel.findByIdAndUpdate(id,data)
        res.status(200).json({
            "message":"Data updated succesfully...",
            data : updatedData
        })
    }catch(err){
        res.status(500).json({
            "message":"internal server error...",
            data : err
        })
    }
}

const deleteProfile = async(req,res) => {
    try{
        const id = req.params.id
        const data =await userModel.findByIdAndDelete({_id:id})
        res.status(200).json({
            "message":"user deleted successfully...",
            data : data
        })
    }catch(err){
        res.status(500).json({
            "message":"internal server error..."
        })
        console.log(err)
    }
}

module.exports = {
    addUser, signIn, getProfileById, updateProfile, deleteProfile
}