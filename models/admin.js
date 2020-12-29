const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = Schema({
  username: { type: String, unique: true, required: true },
  password: String,
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
