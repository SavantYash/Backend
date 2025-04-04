const DonationModel = require("../Models/DonationModel")
const donationRequestModel = require("../Models/DonationRequestModel")
const TransportModel = require("../Models/TransportModel")

const addRequest = async (req, res) => {
    try {
        const data = await donationRequestModel.create(req.body)
        res.status(201).json({
            message: "Data fetched successfully...",
            data: data
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error"
        })
        console.log(err)
    }
}

const getRequest = async (req, res) => {
    try {
        const data = await donationRequestModel.find().populate("ngoId").populate("donorId").populate("donationId")
        res.status(200).json({
            message: "Data fetched successfully...",
            data: data
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error..."
        })
        console.log(err)
    }
}

const getRequestByDonorId = async (req, res) => {
    try {
        const data = await donationRequestModel.find({ donorId: req.params.id }).populate("ngoId")
        res.status(200).json({
            message: "fetched successfully...",
            data: data
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error..."
        })
        console.log(err)
    }
}

const getRequestByNgoId = async (req, res) => {
    try {
        const data = await donationRequestModel.find({ ngoId: req.params.id }).populate('donationId').populate('donorId')
        res.status(200).json({
            message: "fetched successfully...",
            data: data
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error..."
        })
        console.log(err)
    }
}

const updateStatusAccept = async (req, res) => {
    try {
        //update accept on donationrequest model
        const data = await donationRequestModel.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
        if (data) {
            await DonationModel.findByIdAndDelete(data._id)
            //create entry in transport model
            await TransportModel.create({ donationRequestId: data._id })
        }
        res.status(202).json({
            message: "Data updated successfully...",
            data: data
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Internal server error..."
        })
    }
}

module.exports = {
    addRequest, getRequest, getRequestByDonorId, getRequestByNgoId, updateStatusAccept
}