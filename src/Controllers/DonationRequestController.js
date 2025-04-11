const DonationModel = require("../Models/DonationModel")
const donationRequestModel = require("../Models/DonationRequestModel")
const History = require("../Models/History")
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
        const id = req.params.id
        const donation = await donationRequestModel.findByIdAndDelete(id);

        if (donation) {
            const donationData = donation.toObject();
            await DonationModel.deleteOne({_id:donation._id})

            // Remove unwanted fields
            delete donationData.donationId;
            delete donationData._id;
            delete donationData.__v;
            

            // Create new History entry
            const hdata = await History.create(donationData);

            // Use it for transport
            await TransportModel.create({ historyId: hdata._id });

            res.status(202).json({
                message: "Data updated successfully...",
            })
        } else {
            console.log("Donation not found.");
        }
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