const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3010

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const nodemailer = require('nodemailer')

const smtp_user = process.env.SMTP_USER || '---'
const smtp_password = process.env.SMTP_PASSWORD || '---'


// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_user, // generated ethereal user
        pass: smtp_password, // generated ethereal password
    },
})


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/send-message', async (req, res) => {

    const {name, email, message} = req.body

    // send mail with defined transport object
    try {
        const info = await transporter.sendMail({
            from: '"Job Alert!!" <sergeybalanov.folio@gmail.com>', // sender address
            to: 'paraslovjm@gmail.com, tsfoe@mail.ru', // list of receivers
            subject: `${name || 'empty name =^_^='} send you a message.`, // Subject line
            // text: "Hello world?", // plain text body
            html: `<b>You have a message from ${name || 'empty name =^_^='}!</b>
            <div>Message: ${message || 'empty message =^_^='}</div>
            <div>${name || 'empty name =^_^='} email is: ${email || 'empty email =^_^='}</div>`, // html body
        })
    } catch (err) {
        res.send({message: 'something goes wrong', error: err})
    }

    res.send({message: 'email send success', body: req.body})
})

app.listen(port, () => {
    console.log(`App listening`)
})



