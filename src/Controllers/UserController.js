const userModel = require("../Models/UserModel")
const bcrypt = require("bcrypt")
const mailUtil = require("../Utils/MailUtil")
const UserModel = require("../Models/UserModel")
const jwt = require("jsonwebtoken");
const secret = "secret";

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
        await mailUtil.sendMail(req.body.email, "Welcome to WearShare", message)
        res.status(201).json({
            message: 'data added...',
            data: add
        })

    } catch (err) {
        console.log(err)
        res.json({
            message: 'User already exist'
        })
    }
}

//email verification
const sendVerificationCode = async (req, res) => {
    try {
        console.log(req.body.email)
        const user = await UserModel.findOne({ email: req.body.email })
        console.log(user)
        const code = Math.floor(100000 + Math.random() * 900000)
        console.log(code)
        res.status(200).json({
            message: "success...",
            data: code
        })
    } catch (err) {
        res.status(500).json({
            message: "internal server error..."
        })
        console.log(err)
    }
}

const signIn = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        console.log(email, password)
        const user = await userModel.findOne({ email: email }).populate("role")
        console.log(user)

        if (user == null) {
            res.status(202).json({
                message: 'email not exist'
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
            } else {
                res.status(202).json({
                    message: 'Invalid credentials'
                })
            }
        }

    } catch (err) { console.log(err) }
}

const getProfileById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await userModel.findById({ _id: id })
        res.status(200).json({
            "message": "data fetched...",
            data: data
        })
    } catch (err) {
        res.status(500).json({
            "message": "Internal server error"
        })
        console.log(err)
    }
}

const updateProfile = async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const updatedData = await userModel.findOneAndUpdate({ _id: id }, data, { new: true })
        res.status(200).json({
            "message": "Data updated succesfully...",
            data: updatedData
        })
    } catch (err) {
        res.status(500).json({
            "message": "internal server error...",
            data: err
        })
        console.log(err)
    }
}

const deleteProfile = async (req, res) => {
    try {
        const id = req.params.id
        const data = await userModel.findByIdAndDelete({ _id: id })
        res.status(200).json({
            "message": "user deleted successfully...",
            data: data
        })
    } catch (err) {
        res.status(500).json({
            "message": "internal server error..."
        })
        console.log(err)
    }
}

const getAllUser = async (req, res) => {
    try {
        res.status(200).json({
            message: "Data fethced successfully...",
            data: await userModel.find()
        })
    } catch (err) {
        res.status(400).json({
            message: "Internal server error..."
        })
    }
}

const getUsersByName = async (req, res) => {
    try {
        const roleName = req.body.roleName
        const data = await UserModel.find({ roleName: roleName })
        res.status(200).json({
            message: "Data fetched successfully...",
            data: data
        })
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error....'
        })
        console.log(err)
    }
}

const forgotPassword = async (req, res) => {
    const email = req.body.email;
    const foundUser = await userModel.findOne({ email: email });
    try {
        if (foundUser) {
            const token = jwt.sign(foundUser.toObject(), secret);
            const url = `http://localhost:5173/resetpassword/${token}`;
            const mailContent = `<html>
                            <a href ="${url}">rest password</a>
                            </html>`;
            //email...
            await mailUtil.sendMail(foundUser.email, "reset password", mailContent);
            res.status(200).json({
                message: "reset password link sent to mail.",
            });
        } else {
            res.status(500).json({
                message: "user not found register first..",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "internal server error...."
        })
    }
};

const resetpassword = async (req, res) => {
    const token = req.body.token; //decode --> email | id
    const newPassword = req.body.password;

    const userFromToken = jwt.verify(token, secret);
    //object -->email,id..
    //password encrypt...
    const salt = bcrypt.genSaltSync(10);
    const hashedPasseord = bcrypt.hashSync(newPassword, salt);

    const updatedUser = await userModel.findByIdAndUpdate(userFromToken._id, {
        password: hashedPasseord,
    });
    res.json({
        message: "password updated successfully..",
    });
};

module.exports = {
    addUser, signIn, getProfileById, updateProfile, deleteProfile, getAllUser, sendVerificationCode, getUsersByName, forgotPassword, resetpassword
}