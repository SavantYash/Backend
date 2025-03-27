const cloudanry = require("cloudinary").v2

const uploadFileToCloudanry = async (file) => {

    cloudanry.config({
        cloud_name: "dmahi2naq",
        api_key: "565729155965725",
        api_secret: "tEE_Scwnhjfw-azc1t0GeBwOKYo"
    });
    console.log(file)
    const res = await cloudanry.uploader.upload(file.path);
    return res;
}

module.exports = { uploadFileToCloudanry }