const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  message: {
    type: String,
  },
});

module.exports = Contact = mongoose.model("contact", ContactSchema);
