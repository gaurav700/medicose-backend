const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  typeofmedicine: {
    type: String,
    default: "-"
  },
  name: String,
  batch: String,
  company : String,
  tab : Number,
  units: Number,
  mrp: Number,
  expiry: Date,
});


const customerSchema = new mongoose.Schema({
  billNo : String,
  customerName: String,
  doctorName : String,
  medicine: [MedicineSchema],
});

const saleSchema = new mongoose.Schema({
  todayDate : Date,
  customers : [customerSchema],
})

const Sale_History = mongoose.model('Sale_History', saleSchema);

module.exports = Sale_History;
