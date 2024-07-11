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

//Adding Projects.
app.post('/api/projects', async (req,res) =>{
    try{
       const project =  await Project.create(req.body);
       res.sendStatus(200).json(project)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
});

//Posting Qaqc table.
  app.post('/api/qaqc', async (req,res) =>{
        try{
           const qaqc =  await Qaqc.create(req.body);
           res.sendStatus(200).json(qaqc)
        }
        catch(error){
            res.status(500).json({message:error.message})
        }
});

//For posting data on material
app.post('/api/material', async (req,res) =>{
    try{
       const material =  await Material.create(req.body);
       res.sendStatus(200).json(material)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
});

//For posting data on material
app.post('/api/drawing', async (req,res) =>{
    try{
       const drawing =  await Drawing.create(req.body);
       res.sendStatus(200).json(drawing)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
});



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

