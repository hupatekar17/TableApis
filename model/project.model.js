const mongoose = require('mongoose');


// Define the Qaqc schema
const qaqcSchema = mongoose.Schema({
  element: { type: String},
  tests: { type: String },
  standards: { type: String },
  frequency: { type: String},
  status: { type: String},
  remarks: { type: String },

}
);

// Define the Material schema
const materialSchema = new mongoose.Schema({
  element:{type:String},
  document: { type: String},
  docType: { type: String },
  status: { type: String },  
  remarks:{type:String}

});


// Define the Drawing schema
const drawingSchema = new mongoose.Schema({
  location: { type: String},
  doc: { type: String },
  stage: { type: String},
  revision: { type: String },
  status: { type: String },
  remarks: { type: String },

},
{timestamps:true}
);


// Define the Project schema
const projectSchema = new mongoose.Schema({
  name: { type: String},
  qaqcEntries: [qaqcSchema],       // Array of Qaqc entries
  materialEntries: [materialSchema],  // Array of Material entries
  drawingEntries: [drawingSchema]   // Array of Drawing entries
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
