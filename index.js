const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");

const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post("/api/forma", (req, res) => {
  let data = req.body;

  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    auth: {
      user: "form@laquest.net",
      pass: "bcncpjazoydcloib",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailTransporter2 = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    auth: {
      user: "form@laquest.net",
      pass: "bcncpjazoydcloib",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: data.email,
    to: "form@laquest.net",
    subject: `Laquest Inquiry Form`,
    html: `
    <h3>Information</h3>
    <ul>
    <li>Name : ${data.name}</li>
    <li>Lastname : ${data.lastname}</li>
    <li>Email : ${data.email}</li>
    <li>Number : ${data.number}</li>
    <li>Email : ${data.email}</li>
    <li>Company : ${data.company}</li>
    <li>Help : ${data.help}</li>
    <li>Message : ${data.message}</li>
    </ul>
  
    <h3>Message</h3>
  
    <p>${data.message}</p>
    `,
  };

  let mailOptions2 = {
    from: "form@laquest.net",
    to: data.email,
    subject: `Message from Laquest`,
    html: `
    <p>
                        Thank you for filling out your information! <br />
                        <br /> We have received your message and would like to
                        thank you for writing to us. If your inquiry is urgent,
                        please use the telephone numbers listed left to talk to
                        one of our staff members. <br /> <br /> Otherwise, we
                        will reply by email as soon as possible. <br /> <br />
                        Cheers!
                      </p>
    `,
  };

  mailTransporter.sendMail(mailOptions, function (error, res) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent to client successfully");
    }
  });

  mailTransporter2.sendMail(mailOptions2, function (error, res) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent to user successfully");
    }
  });

  mailTransporter.close();
  mailTransporter2.close();
  res.send("api running");
});

app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
