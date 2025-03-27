const rolemodel = require("../Models/RoleModel")

const getAllRoles = async (req,res) =>{

    const roles = await rolemodel.find()
    res.json({
        mesage : 'data send...',
        data : roles,
    })
}

const addUser = async (req,res) => {
    const add = await rolemodel.create(req.body)
    console.log("request body is ",req.body)
    res.json({
        message : "data added successfully...",
        data : add
    })
}

const delUser = async (req,res) => {
    const del =  await rolemodel.findByIdAndDelete(req.params.id)
    console.log("id is ",req.params.id)
    res.json({
        message : 'data is deleted..',
        data : del
    })
}

module.exports = {
    getAllRoles,addUser,delUser
}