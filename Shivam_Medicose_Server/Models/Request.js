const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  name: String,
  address : String,
  phoneNo : Number,
  tab: {
    type: Number, 
    required: false
  },
  medName: {
    type: String, 
    required: false
  },
  medFile: {
    type: String,
    required: false
  }
});

const Request_Schema = mongoose.model('Request_Schema', RequestSchema);

module.exports = Request_Schema;
