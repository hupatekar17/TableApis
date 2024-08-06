// Mongo Database Login ID and password:
//  Email Id: cibatuvi@imagepoet.net
// Password: Harsh@1234

const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
// const Qaqc = require('./model/qaqc.model.js')
// const Material= require('./model/material.model.js')
// const Drawing = require('./model/drawing.model.js')
const Project = require('./model/project.model.js')
const app = express() 

app.use(cors());

app.use(express.json());

app.get('/',(req,res)=>{
    res.send(
        "API IS WORKING "
    )
})


//adding the constants for qaqc

const defaultQaqcvalues = 
[
  { "element": "Aluminium extrusions", "test": "Hardness test", "frequency": "For each lot", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Aluminium extrusions", "test": "Chemical Test- Wet and Spectrograph", "frequency": "3 nos. of sample Per testing 100 tons/ 5000Sq. m of façade", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Aluminium extrusions", "test": "Mechanical Test- Tensile Proof Stress tests", "frequency": "- 3 nos. of sample Per testing 100 tons/ 5000Sq. m of façade", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Aluminium extrusions", "test": "Hardness test", "frequency": "For each lot", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Aluminium extrusions", "test": "Chemical Test- Wet and Spectrograph", "frequency": "3 nos. of sample Per testing 100 tons/ 5000Sq. m of façade", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Aluminium extrusions", "test": "Mechanical Test- Tensile Proof Stress tests", "frequency": "- 3 nos. of sample Per testing 100 tons/ 5000Sq. m of façade", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Alum. Extrusion- Finish", "test": "Dry Film Thickness D1005", "frequency": "5 nos of sample 300 mm length per batch of powder coating / PVDF", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Alum. Extrusion- Finish", "test": "Pencil Hardness D3363", "frequency": "All tests specified herein to be carried out for every 100Tons of Aluminium profiles for each colour", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Finish to Aluminium extrusions", "test": "Scratch Resistance D1474", "frequency": "All tests specified herein to be carried out for every 100Tons of Aluminium profiles for each colour", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Finish to Aluminium extrusions", "test": "Abrasion Resistance D4060", "frequency": "All tests specified herein to be carried out for every 100Tons of Aluminium profiles for each colour", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Finish to Aluminium extrusions", "test": "Impact Resistance D2794", "frequency": "All tests specified herein to be carried out for every 100Tons of Aluminium profiles for each colour", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Finish to Aluminium extrusions", "test": "Salt Spray B117", "frequency": "All tests specified herein to be carried out for every 100Tons of Aluminium profiles for each colour", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Finish to Aluminium extrusions", "test": "Adhesion- D2197, D3359", "frequency": "All tests specified herein to be carried out for every 100Tons of Aluminium profiles for each colour", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Finish to Aluminium extrusions", "test": "Gloss level D523", "frequency": "All tests specified herein to be carried out for every 100Tons of Aluminium profiles for each colour", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Finish to Aluminium extrusions", "test": "Color D2244", "frequency": "All tests specified herein to be carried out for every 100Tons of Aluminium profiles for each colour", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Finish to Aluminium extrusions", "test": "Third party tests for Finishes/Coating have to be done in presence of BES", "frequency": "All tests specified herein to be carried out for every 100Tons of Aluminium profiles for each colour", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Sealants-Structural", "test": "Compatibility test for - Aluminium - Steel Compatibility with - PVF2 / Paint Finish - Glass coating - Glazing Gasket - Setting block - Spacer Tape - Spacers", "frequency": "ASTM C-1087", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Sealants-Structural", "test": "Non-Stain Test Presence of Sealant manufacturer Confirmation of method statement by manufacturer", "frequency": "C 1248", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Glass Fittings", "test": "Laboratory Tests: Physical and Chemical tests (Steel Grade tests(Dry/Wet), Hardness, Load bearing capacity, tensile/compressive capacities OR Manufacturer’s Test certificates material grade mentioned with structural strengths etc.", "frequency": "", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Gaskets and spacers", "test": "Shore Hardness", "frequency": "", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Gaskets and spacers", "test": "Chemical Test", "frequency": "", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Finish to Steel", "test": "Abrasive/ Blast cleaning BS EN ISO 8504-2: 2001 Part 2", "frequency": "Minimum 3 samples to be tested per batch", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Finish to Steel", "test": "Film thickness D1005", "frequency": "", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Finish to Steel", "test": "Adhesion D2197 / D3359", "frequency": "", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Finish to Steel", "test": "Resistance to Impact D2794", "frequency": "", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Finish to Steel", "test": "Test for color fastness and consistency", "frequency": "", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "GRC", "test": "Glass content BS EN 1170Part2", "frequency": "Record", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "GRC", "test": "Modulus of Rupture BS EN 1170Part5", "frequency": "Record", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Gutter Ponding Test", "test": "", "frequency": "Conduct 100% gutter testing for all gutters of Curtain wall. All stand joint drainage gutters shall be flooded to a maximum freeboard height and left for 12 Hrs.", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Site Water Test", "test": "AAMA standard with Monarch Nozzle", "frequency": "First Test: Upon Typical Façade to be tested for completion of 1000Sq. m or 10% of Façade area. Subsequent test: Upon completion of every 3 floors / as per consultant’s instruction Contractor should carry Water test at minimum 10 locations randomly selected by consultant", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Site Performance Test (with Enclosed chamber)", "test": "AAMA 501.2 & 502.2", "frequency": "Specimen size as per project façade requirement.", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Welding Test", "test": "First Test: Upon Mock-up approval Subsequent test: Periodic -DPT -75% -MPT ASTM E165 -10 to 25 % for plate thickness upto 24mm & - 25 to 100% for plates more than 24mm -UT ASTM E94 & ASTM E747 -10 to 25 % for plate thickness upto 24mm & - 25 to 100% for plates more than 24mm", "frequency": "", "status": "Not Completed", "standards": "", "remarks": "" },
  { "element": "Anchor Pull-out Test", "test": "IS11309-1985", "frequency": "", "status": "Not Completed", "standards": "", "remarks": "" }
]


//Fetching qaqc entries
//changes made on 29th july
app.get('/api/projects/:id/qaqc', async (req, res) => {
  try {
    const { id } = req.params;
    const qaqcEntries = await QaQcEntry.find({ id });
    res.json(qaqcEntries);
} catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
}
});



//Making a get call from the Projet -> Nested Get
app.get('/api/projects', async (req, res) => {
    try {
      const project = await Project.find({}).select({name:1});
      if (!project) return res.status(404).json({ message: 'Project not found' });
      res.status(200).json(project); 
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });






// Define a route to get a project by its id

app.get('/api/projects/:id', async (req, res) => {
  try {
    // Extract the project id from the request parameters
    const { id } = req.params;

    // Find the project by id
    const project = await Project.findById(id);

    // If no project is found, return a 404 status with a message
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Return the project data with a 200 status
    res.status(200).json(project);
  } catch (error) {
    // Handle errors by returning a 400 status with the error message
    res.status(400).json({ message: error.message });
  }
});


  //Patch -> Update a Project
  app.patch('/api/projects/:id', async (req, res) => {
    try {
      const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedProject) return res.status(404).json({ msessage: 'Project not found' });
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
      const qaqcArr=req.body;
      const updateArr=qaqcArr.filter(a=>!!a._id);
      const insertArr=qaqcArr.filter(a=>!a._id);
     // console.log(`updateArr::${JSON.stringify(updateArr)}`);
      //console.log(`insertArr::${JSON.stringify(insertArr)}`);
      if(updateArr){
        for (const qaqc of updateArr) {
         const updateObj= project.qaqcEntries.id(qaqc._id);
         updateObj.$set(qaqc);
        }
      }

      if(insertArr){
        for (const qaqc of insertArr) {
          project.qaqcEntries.push(qaqc);
         }
      }
      await project.save();
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
   //Post Post call for nested qaqc
   app.post('/api/projects/:id/material', async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) return res.status(404).json({ message: 'Project not found' });
      const materialArr=req.body;
      const updateArr=materialArr.filter(a=>!!a._id);
      const insertArr=materialArr.filter(a=>!a._id);
     // console.log(`updateArr::${JSON.stringify(updateArr)}`);
      //console.log(`insertArr::${JSON.stringify(insertArr)}`);
      if(updateArr){
        for (const material of updateArr) {
         const updateObj= project.materialEntries.id(material._id);
         updateObj.$set(material);
        }
      }

      if(insertArr){
        for (const material of insertArr) {
          project.materialEntries.push(qaqc);
         }
      }
      await project.save();
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  //post call for drawing
  app.post('/api/projects/:id/drawing', async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) return res.status(404).json({ message: 'Project not found' });
      const drawingArr=req.body;
      const updateArr=drawingArr.filter(a=>!!a._id);
      const insertArr=drawingArr.filter(a=>!a._id);
     // console.log(`updateArr::${JSON.stringify(updateArr)}`);
      //console.log(`insertArr::${JSON.stringify(insertArr)}`);
      if(updateArr){
        for (const drawing of updateArr) {
         const updateObj= project.drawingEntries.id(drawing._id);
         updateObj.$set(drawing);
        }
      }

      if(insertArr){
        for (const drawing of insertArr) {
          project.drawingEntries.push(qaqc);
         }
      }
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
  app.post('/api/projects/:_id/drawing', async (req, res) => {
    try {
      const project = await Project.findById(req.params._id);
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
  
  
  
  

//Adding Projects -> For Sidebar

app.post('/api/projects', async (req,res) =>{
    try{
        const projectRequest=req.body;
        projectRequest.qaqcEntries=defaultQaqcvalues;
       const project =  await Project.create(projectRequest);
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

//latest update for drawing approval:

let drawingApprovals = {};

// POST endpoint to save drawing approvals
app.post('/api/projects/:id/drawing', (req, res) => {
  const projectId = req.params.id;
  const data = req.body;

  // Validate data (you might want to add more robust validation)
  if (!Array.isArray(data)) {
    return res.status(400).json({ message: 'Invalid data format' });
  }

  // Save the data (in this example, we use an in-memory object)
  drawingApprovals[projectId] = data;

  res.status(200).json({ message: 'Data saved successfully', data });
});

// GET endpoint to retrieve drawing approvals (for testing purposes)
app.get('/api/projects/:id/drawing', (req, res) => {
  const projectId = req.params.id;
  const data = drawingApprovals[projectId] || [];

  res.status(200).json(data);
});

//For posting data on material
app.post('/api/drawing', async (req,res) =>{
    try{
       const drawing =  await Drawing.create(req.body);
       res.status(200).json(drawing)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}); 

//API For pdf generator
app.post('/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
      if(err) {
          res.send(Promise.reject());
      }

      res.send(Promise.resolve());
  });
});

app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`)
})



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
//Project 1-> table 12

