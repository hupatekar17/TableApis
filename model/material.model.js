const mongoose = require('mongoose');

const documentTypeEnum = ['PDF', 'Word', 'Excel', 'PowerPoint'];
const pendingEnum = ['Partially Closed', 'Closed', 'Open','Rejected'];

const materialSchema = new mongoose.Schema({
  sno: { type: Number, required: true },
  element:{type:String, required:true},
  document: { type: String, required: true },
  docType: { type: String, enum: documentTypeEnum, required: true },
  BesComment: { type: String, required: true },
  status: { type: String, enum: pendingEnum, required: true }
},
{timestamps:true});


const Material = mongoose.model('Material', materialSchema);

module.exports = Material;

