const mongoose = require('mongoose');

const pendingEnum = ['Partially Closed', 'Closed', 'Open'];

const qaqcSchema = mongoose.Schema({
  element: { type: String, required: [true, "Please enter name"] },
  tests: { type: String, required: true },
  standards: { type: String, required: true },
  frequency: { type: String, required: true },
  status: { type: String, enum: pendingEnum, required: true },
  remarks: { type: String, required: true },

},{timestamps:true}
);

const Qaqc = mongoose.model('Qaqc', qaqcSchema);

module.exports = Qaqc;

