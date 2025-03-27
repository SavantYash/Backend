const mailer = require("nodemailer")

const sendMail = async(to,subject,message) => {

    const transporter = mailer.createTransport({
        service:'gmail',
        auth:{
            user:"yashsavant84@gmail.com",
            pass : "itwe qktp yozi dryr"
        }
    })

    const mialOptions = {
        from : "yashsavant84@gmail.com",
        to : to,
        subject : subject,
        html : message
    }

    const res = await transporter.sendMail(mialOptions);

    return res;
}

module.exports= { sendMail }