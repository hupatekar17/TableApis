const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    sno: { type: Number, required: true },
    name: {type:String, required:true},
  },
  {timestamps:true});


    const Project = mongoose.model('Project', projectSchema);

    module.exports = Project;
