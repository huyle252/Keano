const express = require("express");
const app = express();
const server = require("http").Server(app);
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require('multer')
const url = `mongodb+srv://huyle252:family9788vn@cluster0.ote7who.mongodb.net/bana?retryWrites=true&w=majority`;
const path = require("path");
MongoClient.connect(url).then((client) => {
  const connect = client.db(bana)
  connect.listCollections().toArray(function(err, names) {   
      if(!err) {
          console.log(names)
      }
  });
}).catch((err) => {

  // Printing the error message
  console.log(err.Message);
})

const formSchema = new mongoose.Schema(
  {
    data: Object,
  },
  { collection: `words` }
);

const Form = mongoose.model("Form", formSchema);

const formData = (bodyData) => {
  Form({ data: bodyData }).save((err) => {
    if (err) {
      throw err;
    }
  });
};

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.get('/', (req,res) => {
  res.render('home');
  
})
app.get("/create", (req, res) => {
  res.render("index");
});

app.post("/create", urlencodedParser, (req, res) => {
  formData(req.body);
  res.render("success", { name: req.body.name });
  res.redirect('home');
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
  

server.listen(3000);