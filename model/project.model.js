const mongoose = require('mongoose');

// Define the enums as in the previous schemas
const pendingEnum = ['Partially Closed', 'Closed', 'Open', 'Rejected'];
const documentTypeEnum = ['PDF', 'Word', 'Excel', 'PowerPoint'];
const statusEnum = ['Pending', 'Approved', 'Rejected'];

// Define the Qaqc schema
const qaqcSchema = mongoose.Schema({
  serialNumber: { type: Number, required: true },
  element: { type: String, required: [true, "Please enter name"] },
  standards: { type: String, required: true },
  frequency: { type: String, required: true },
  status: { type: String, enum: pendingEnum, required: true }
}, { timestamps: true });

// Define the Material schema
const materialSchema = new mongoose.Schema({
  serialNumber: { type: Number, required: true },
  element: { type: String, required: true },
  document: { type: String, required: true },
  docType: { type: String, enum: documentTypeEnum, required: true },
  BesComment: { type: String, required: true },
  status: { type: String, enum: pendingEnum, required: true }
}, { timestamps: true });

// Define the Drawing schema
const drawingSchema = new mongoose.Schema({
  serialNumber: { type: Number, required: true },
  facadeReference: { type: String, required: true },
  submissionDate: { type: Date, required: true },
  approvalDate: { type: Date, required: true },
  link: { type: String },
  pendingIssue: { type: String },
  status: { type: String, enum: statusEnum, default: 'Pending' }
}, { timestamps: true });

// Define the Project schema
const projectSchema = new mongoose.Schema({
  srNo: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  qaqcEntries: [qaqcSchema],       // Array of Qaqc entries
  materialEntries: [materialSchema],  // Array of Material entries
  drawingEntries: [drawingSchema]   // Array of Drawing entries
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
