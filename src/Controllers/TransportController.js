const History = require("../Models/History")
const TransportModel = require("../Models/TransportModel")
const UserModel = require("../Models/UserModel")

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
        const data = await TransportModel.find({ volunteerId: null }).populate({
            path: 'historyId',
            populate: [
                { path: 'ngoId' },
                { path: 'donorId' }
            ]
        });

        res.status(200).json({
            message: "data fetched successfully...",
            data: data
        })
    } catch (err) {
        console.log(err)
    }
}

//volunteer on accept set volunteer id
const onAccept = async (req, res) => {
    try {
        console.log(req.params)
        const { id, id1 } = req.params
        const model = await TransportModel.findByIdAndUpdate({ _id: id1 }, { volunteerId: id, status: 'Assign Volunteer' }, { new: true })
        await History.findByIdAndUpdate({ _id: model?.historyId }, { volunteerId: id, status: 'Assign Volunteer' })
    } catch (err) {
        console.log(err)
    }
}

//fetch data via transport id
const fetchDataByVid = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const data = await TransportModel.findOne({ _id: id }).populate({
            path: 'historyId',
            populate: [
                { path: 'ngoId' },
                { path: 'donorId' }
            ]
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

//fetch data via volunteer Id
const fetchDataById1 = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const data = await TransportModel.find({ volunteerId: id }).populate({
            path: 'historyId',
            populate: [
                { path: 'ngoId' },
                { path: 'donorId' }
            ]
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

//fetch data via any user
const getDataById = async (req, res) => {
    try {
        const { id } = req.params
        var data = null
        const user = await UserModel.findOne({ _id: id })

        //get all history related userId
        if (user.roleName == "donor") {
            data = await History.find({ donorId: id })
        } else if (user.roleName == "ngo") {
            data = await History.find({ ngoId: id })
        }

        //using history id retrive data from transport model
        const historyIds = data?.map(h => h._id);
        const transports = await TransportModel.find({ historyId: { $in: historyIds } });

        res.status(202).json({
            message: "Data fetched successfully...",
            data: transports
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: "Internal server error..."
        })
    }
}

const updateStatus = async (req, res) => {
    try {
        const id = req.params.id
        const model = await TransportModel.findOne({ _id: id });
        const status = model.status;
        const historyId = model.historyId;

        if (status === "Assign Volunteer") {
            await TransportModel.updateOne({ _id: id }, { status: "PickedUp" });
            await History.updateOne({ _id: historyId }, { status: "PickedUp" });
        } else if (status === "PickedUp") {
            await TransportModel.updateOne({ _id: id }, { status: "Delivered" });
            await History.updateOne({ _id: historyId }, { status: "Delivered" });
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    addTransport,
    getTransport,
    onAccept,
    fetchDataByVid,
    updateStatus,
    getDataById,
    fetchDataById1
}