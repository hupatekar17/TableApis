const mongoose = require('mongoose');

const pendingEnum = ['Partially Closed', 'Closed', 'Open','Rejected'];

const materialSchema = new mongoose.Schema({
  element:{type:String, required:true},
  document: { type: String, required: true },
  docType: { type: String, required: true },
  status: { type: String, enum: pendingEnum, required: true },
  remarks:{type:String, required:true},

},
{timestamps:true});


const Material = mongoose.model('Material', materialSchema);

module.exports = Material;

