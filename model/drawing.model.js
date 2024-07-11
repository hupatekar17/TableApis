const mongoose = require('mongoose');


const statusEnum = ['Pending', 'Approved', 'Rejected'];

const drawingSchema = new mongoose.Schema({
  serialNumber: { type: Number, required: true },
  facadeReference: { type: String, required: true },
  submissionDate: { type: Date, required: true },
  approvalDate: { type: Date, required:true },
  link: { type: String },
  pendingIssue: { type: String },
  status: { type: String, enum: statusEnum, default: 'Pending' }
},
{timestamps:true}
);

const Drawing = mongoose.model('Drawing', drawingSchema);

module.exports = Drawing;
