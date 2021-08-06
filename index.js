const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3010

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const nodemailer = require("nodemailer");

const smtp_user = process.env.SMTP_USER
const smtp_password = process.env.SMTP_PASSWORD


// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: smtp_user, // generated ethereal user
        pass: smtp_password, // generated ethereal password
    },
});


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/send-message', async (req, res) => {

    const {name, email, message} = req.body

    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Job Alert!!" <sergeybalanov.folio@gmail.com>', // sender address
        to: "paraslovjm@gmail.com, tsfoe@mail.ru", // list of receivers
        subject: `${name} send you a message.`, // Subject line
        // text: "Hello world?", // plain text body
        html: `<b>You have a message from ${name}!</b>
            <div>Message: ${message}</div>
            <div>${name} email is: ${email}</div>`, // html body
    });

    res.send({message: 'email send success'})
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



