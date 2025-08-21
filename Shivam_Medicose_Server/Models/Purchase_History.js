const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  name: String,
  company : String,
  tab : Number,
  units: Number,
  packages : Number,
  batch : String,
  rate : Number,
  mrp : Number,
  counter : Number,
  tabLeft : Number,
  unitsLeft: Number,
  packagesLeft : Number,
  expiry: Date,
});

// Pre-save hook to set unitsLeft equal to units when a new medicine is added
MedicineSchema.pre('save', function (next) {
  if (this.isNew) {
    this.unitsLeft = this.units*this.packages;
  }
  if (this.isNew) {
    this.tabLeft = this.tab*this.units*this.packages;
  }
  if (this.isNew) {
    this.packagesLeft = this.packages;
  }
  next();
});

const Purchase_History_Schema = new mongoose.Schema({
  vendorName: String,
  purchaseDate: Date,
  medicine: [MedicineSchema],
});

const Purchase_History = mongoose.model('Purchase_History', Purchase_History_Schema);

module.exports = Purchase_History;
