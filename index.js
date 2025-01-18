import express from "express";
import bodyParser from "body-parser";
import { MailtrapClient } from "mailtrap"
import 'dotenv/config'

const apps = express();
const port = process.env.PORT || 3000;
const TOKEN = process.env.token;
const SENDER_EMAIL = process.env.sender_mail;
const RECIPIENT_EMAIL = process.env.reciver_mail;

const client = new MailtrapClient({ token: TOKEN });

// const sender = { name: "Karuppatti-coffee", email: SENDER_EMAIL };

apps.use(bodyParser.urlencoded({ extended: true }));
apps.use(express.static("public"));

apps.get("/",(req,res)=>{
    res.render("index.ejs")
})
apps.post("/submit",(req,res)=>{
    const {name,mail,number,location,texts}= req.body;
    client.send({
    from: { name: "Mailtrap Test", email: SENDER_EMAIL },
    to: [{ email: RECIPIENT_EMAIL }],
    template_uuid: process.env.temp_id,
    template_variables: {
      "name": name,
      "email": mail,
      "number": number,
      "location": location,
      "texts": texts
    }
  })
  .then(console.log)
  .catch(console.error);
  res.redirect("/");
})

apps.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
// exports.apps = functions.https.onRequest(apps);