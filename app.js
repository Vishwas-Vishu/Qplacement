const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Contact = require("./models/contact");

require("dotenv").config();

const publicDirectoryPath = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./views");

var port = process.env.PORT || 8080;

//Please use below link for local server
// const URL = "mongodb://localhost:27017/placement";

//donot use the below link for testing
const URL =
  process.env.MONGO_URL ||
  "mongodb+srv://placement:Yg2xyzeulixVDuSL@cluster0.7kntx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

app.set("views", viewsPath);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicDirectoryPath));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/testinomial", (req, res) => {
  res.render("testinomial");
});

app.get("/gallary", (req, res) => {
  res.render("gallary");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/thanks", (req, res) => {
  res.render("thanks");
});

app.post("/contact", async (req, res) => {
  // console.log(req.body);
  const newContact = new Contact(req.body);
  await newContact.save();
  // console.log(newProduct);
  res.redirect("/thanks");
});

app.get("/show", async (req, res) => {
  if (req.query.search) {
    count = 1;
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    var contacts = await Contact.find({
      $or: [{ name: regex }, { email: regex }, { phone: regex }],
    });
    const con = await Contact.find({}).countDocuments({});
    // var users = await User.find({ branch: regex });
    res.render("show", { contacts, con });
  } else {
    count = 1;
    //   const users = await User.find({});
    const con = await Contact.find({}).countDocuments();
    const contacts = await Contact.find({});
    // console.log(contacts);
    res.render("show", { contacts, con });
  }
});

app.delete("/show/:id", async (req, res) => {
  const { id } = req.params;
  const deleteContacts = await Contact.findByIdAndDelete(id);
  res.redirect("/show");
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
