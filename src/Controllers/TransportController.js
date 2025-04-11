const TransportModel = require("../Models/TransportModel")

const addTransport = async (req, res) => {
    try {
        await TransportModel.create(req.body)
        res.status(201).json({
            message: "Data added successfully...",
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error..."
        })
        console.log(err)
    }
}

const getTransport = async (req, res) => {
    try {
        const data = await TransportModel.find({volunteerId:null}).populate({
            path: 'historyId',
            populate: {
                path: 'ngoId'
            }
        });

        res.status(200).json({
            message: "data fetched successfully...",
            data: data
        })
    } catch (err) {
        console.log(err)
    }
}

const onAccept = async (req, res) => {
    try {
        console.log(req.params)
        const { id, id1 } = req.params
        console.log(await TransportModel.findByIdAndUpdate({ _id: id1 }, { volunteerId: id }))
    } catch (err) {
        console.log(err)
    }
}

const fetchDataByVid = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const data = await TransportModel.find({ volunteerId: id }).populate({
            path:'historyId',
            populate:{
                path:'ngoId'
            }
        })
        console.log(data)
        res.status(200).json({
            message: 'data fetched successfully...',
            data: data
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    addTransport,
    getTransport,
    onAccept,
    fetchDataByVid
}