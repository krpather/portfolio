const express = require("express");
const http = require('http');
const path = require('path');
const bodyParser = require("body-parser");
const urlencoded = require("body-parser/lib/types/urlencoded");
const nodeMailer = require('nodemailer')

const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.render("main");
});

app.get("/download", function(req,res) {
    res.download("./public/docs/cv.pdf")
})

app.post('/send', function(req,res){
    let name =  req.body.name;
    let email = req.body.email;
    let message = req.body.message;

    async function sendMessage() {
        let transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: "keananpather@gmail.com",
                pass: 'kylerjfzabbqwzgu'
            }
        });
    
        let details = {
            from: "keananpather@gmail.com",
            to: "keananpather@gmail.com",
            subject: `Personal Website email from: ${name}, email: ${email}`,
            text: message
        }
    
        let info = await transporter.sendMail(details, function(err){
            if (err){
                console.log(err)
            } else{
                res.render('success')
            }
        });
    }

    sendMessage()

});

app.listen(port);