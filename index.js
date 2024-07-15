const express = require('express')
const mongoose = require('mongoose')
const Qaqc = require('./model/qaqc.model.js')
const Material= require('./model/material.model.js')
const Drawing = require('./model/drawing.model.js')
const Project = require('./model/project.model.js')
const app = express() 

app.use(express.json());

app.get('/',(req,res)=>{
    res.send(
        "Hello from node api"
    )
})
//Making a get call from the Projet -> Nested Get
app.get('/api/projects', async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) return res.status(404).json({ message: 'Project not found' });
      res.status(200).json(project);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  //Patch -> Update a Project
  app.patch('/api/projects/:id', async (req, res) => {
    try {
      const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
      res.status(200).json(updatedProject);
      
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  //Delete a project
  app.delete('/api/projects/:id', async (req, res) => {
    try {
      const deletedProject = await Project.findByIdAndDelete(req.params.id);
      if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

  //Post Post call for nested qaqc
  app.post('/api/projects/:id/qaqc', async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) return res.status(404).json({ message: 'Project not found' });
  
      project.qaqcEntries.push(req.body);
      await project.save();
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  //patch update call for nested qaqc.
  app.patch('/api/projects/:id/qaqc/:qaqcId', async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) return res.status(404).json({ message: 'Project not found' });
  
      const qaqcEntry = project.qaqcEntries.id(req.params.qaqcId);
      if (!qaqcEntry) return res.status(404).json({ message: 'Qaqc entry not found' });
  
      qaqcEntry.set(req.body);
      await project.save();
      res.status(200).json(project);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  //delete api for nested qaqc. 
app.delete('/api/projects/:id/qaqc/:qaqcId', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const qaqcId = mongoose.Types.ObjectId(req.params.qaqcId);
    const qaqcEntry = project.qaqcEntries.id(qaqcId);

    if (!qaqcEntry) return res.status(404).json({ message: 'QAQC entry not found' });

    qaqcEntry.remove();
    await project.save();
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


  
  //Matrial Endpoints

  //Materail Post
  app.post('/api/projects/:projectId/material', async (req, res) => {
    try {
      const project = await Project.findById(req.params.projectId);
      if (!project) return res.status(404).json({ message: 'Project not found' });
  
      project.materialEntries.push(req.body);
      await project.save();
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  //Matrial Get 
  app.get('/api/projects/:projectId/material', async (req, res) => {
    try {
      const project = await Project.findById(req.params.projectId);
      if (!project) return res.status(404).json({ message: 'Project not found' });
  
      res.status(200).json(project.materialEntries);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  //Material Get specific Entry 
  app.get('/api/projects/:projectId/material/:materialId', async (req, res) => {
    try {
      const project = await Project.findById(req.params.projectId);
      if (!project) return res.status(404).json({ message: 'Project not found' });
  
      const materialEntry = project.materialEntries.id(req.params.materialId);
      if (!materialEntry) return res.status(404).json({ message: 'Material entry not found' });
  
      res.status(200).json(materialEntry);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  //Materail Update
  app.patch('/api/projects/:projectId/material/:materialId', async (req, res) => {
    try {
      const project = await Project.findById(req.params.projectId);
      if (!project) return res.status(404).json({ message: 'Project not found' });
  
      const materialEntry = project.materialEntries.id(req.params.materialId);
      if (!materialEntry) return res.status(404).json({ message: 'Material entry not found' });
  
      materialEntry.set(req.body);
      await project.save();
      res.status(200).json(materialEntry);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  //Material Delete
  app.delete('/api/projects/:projectId/material/:materialId', async (req, res) => {
    try {
      const project = await Project.findById(req.params.projectId);
      if (!project) return res.status(404).json({ message: 'Project not found' });
  
      project.materialEntries.id(req.params.materialId).remove();
      await project.save();
      res.status(200).json({ message: 'Material entry deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  
  //Drawing Endpoints.

  //Drawing Post
  app.post('/api/projects/:projectId/drawing', async (req, res) => {
    try {
      const project = await Project.findById(req.params.projectId);
      if (!project) return res.status(404).json({ message: 'Project not found' });
  
      project.drawingEntries.push(req.body);
      await project.save();
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  //Drawing get all
  app.get('/api/projects/:projectId/drawing', async (req, res) => {
    try {
      const project = await Project.findById(req.params.projectId);
      if (!project) return res.status(404).json({ message: 'Project not found' });
  
      res.status(200).json(project.drawingEntries);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  //Drawing Get specific
  app.get('/api/projects/:projectId/drawing/:drawingId', async (req, res) => {
    try {
      const project = await Project.findById(req.params.projectId);
      if (!project) return res.status(404).json({ message: 'Project not found' });
  
      const drawingEntry = project.drawingEntries.id(req.params.drawingId);
      if (!drawingEntry) return res.status(404).json({ message: 'Drawing entry not found' });
  
      res.status(200).json(drawingEntry);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  //Drawing Update
  app.patch('/api/projects/:projectId/drawing/:drawingId', async (req, res) => {
    try {
      const project = await Project.findById(req.params.projectId);
      if (!project) return res.status(404).json({ message: 'Project not found' });
  
      const drawingEntry = project.drawingEntries.id(req.params.drawingId);
      if (!drawingEntry) return res.status(404).json({ message: 'Drawing entry not found' });
  
      drawingEntry.set(req.body);
      await project.save();
      res.status(200).json(drawingEntry);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  //Drawing Delete
  app.delete('/api/projects/:projectId/drawing/:drawingId', async (req, res) => {
    try {
      const project = await Project.findById(req.params.projectId);
      if (!project) return res.status(404).json({ message: 'Project not found' });
  
      project.drawingEntries.id(req.params.drawingId).remove();
      await project.save();
      res.status(200).json({ message: 'Drawing entry deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  
  
  

//Adding Projects.

app.post('/api/projects', async (req,res) =>{
    try{
       const project =  await Project.create(req.body);
       res.status(200).json(project)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
});

// //Posting Qaqc table.
//   app.post('/api/qaqc', async (req,res) =>{
//         try{
//            const qaqc =  await Qaqc.create(req.body);
//            res.status(200).json(qaqc)
//         }
//         catch(error){
//             res.status(500).json({message:error.message})
//         }
// });

// //For posting data on material
// app.post('/api/material', async (req,res) =>{
//     try{
//        const material =  await Material.create(req.body);
//        res.status(200).json(material)
//     }
//     catch(error){
//         res.status(500).json({message:error.message})
//     }
// });

// //For posting data on material
// app.post('/api/drawing', async (req,res) =>{
//     try{
//        const drawing =  await Drawing.create(req.body);
//        res.status(200).json(drawing)
//     }
//     catch(error){
//         res.status(500).json({message:error.message})
//     }
// });



mongoose.connect(
    "mongodb+srv://harsh:1234@backend.vqywshf.mongodb.net/?retryWrites=true&w=majority&appName=Backend")
    .then(() => {
        console.log("Connected to the database");
    })
    .catch(() =>{
         console.log("Connection Failed");
    })


app.listen(4000,()=>{
    console.log('Server running on 4000');
})
//Project 1-> table 123   2- > Table 1234  3->table123 4 
