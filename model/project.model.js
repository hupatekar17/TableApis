const mongoose = require('mongoose');


// Define the Qaqc schema
const qaqcSchema = mongoose.Schema({
  element: { type: String},
  tests: { type: String },
  standards: { type: String },
  frequency: { type: String},
  status: { type: String},
  remarks: { type: String },

},{timestamps:true}
);

// Define the Material schema
const materialSchema = new mongoose.Schema({
  element:{type:String, required:true},
  document: { type: String, required: true },
  docType: { type: String, required: true },
  status: { type: String, required: true },  
  remarks:{type:String, required:true}

},
{timestamps:true});


// Define the Drawing schema
const drawingSchema = new mongoose.Schema({
  location: { type: String, required: true },
  doc: { type: String, required: true },
  stage: { type: String, required:true },
  revision: { type: String },
  status: { type: String, default: 'Pending' },
  remarks: { type: String },

},
{timestamps:true}
);


// Define the Project schema
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qaqcEntries: [qaqcSchema],       // Array of Qaqc entries
  materialEntries: [materialSchema],  // Array of Material entries
  drawingEntries: [drawingSchema]   // Array of Drawing entries
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
