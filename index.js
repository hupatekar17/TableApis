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
        "API IS not "
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
const QaQcEntry = require('./model/project.model.js'); // Adjust path as needed

app.get('/api/projects/:id/qaqc', async (req, res) => {
  try {
    const { id } = req.params;

    // Find documents by ObjectId, assuming 'id' is an ObjectId
    const qaqcEntries = await QaQcEntry.find({ projectId: id });

    // Check if qaqcEntries is an array and not empty
    if (Array.isArray(qaqcEntries) && qaqcEntries.length > 0) {
      res.json({ qaqcEntries }); // Ensure this matches the frontend expectations
    } else {
      res.json({ qaqcEntries: [] }); // Return an empty array if no entries are found
    }
  } catch (error) {
    console.error('Error fetching QAQC data:', error.message);
    res.status(500).send('Server Error');
  }
});
app.post('/api/projects/:id/qaqc', async (req, res) => {
  try {
    const projectId = req.params.id;
    const newQaqcEntry = req.body;

    // Validate the QAQC entry
    if (!newQaqcEntry.element || !newQaqcEntry.tests || !newQaqcEntry.standards || !newQaqcEntry.frequency || !newQaqcEntry.status) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Find the project by ID
    const project = await Project.findById(projectId);

    // If project is not found, return a 404 error
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Add the new QAQC entry to the project
    project.qaqcEntries.push(newQaqcEntry);

    // Save the updated project
    await project.save();

    // Return the updated QAQC entries
    res.status(201).json(project.qaqcEntries);
  } catch (error) {
    // Log any errors
    console.error('Error adding QAQC entry:', error);
    res.status(500).json({ message: 'Server error' });
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


//Changes as of 13 aug

app.get('/api/projects/:id/qaqc', async (req, res) => {
  try {
    const projectId = req.params.id;

    // Find the project by ID
    const project = await Project.findById(projectId).select('qaqcEntries');

    // If project is not found, return a 404 error
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Send the QAQC entries as the response
    res.json(project.qaqcEntries);
  } catch (error) {
    // Handle any errors that occur
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


//Working 
// Route to add a drawing to a project
app.post('/api/projects/:id/drawing', async (req, res) => {
  try {
    const projectId = req.params.id;
    const drawingData = req.body;

    // Validate drawingData if needed
    if (!drawingData.location || !drawingData.doc || !drawingData.stage) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    // Find the project by ID and add the drawing
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Add the drawing to the project's drawingEntries array
    project.drawingEntries.push(drawingData);

    // Save the updated project
    await project.save();

    res.status(201).json({ message: 'Drawing added successfully', drawing: drawingData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the drawing' });
  }
});

//qaqc// Route to add a QAQC entry to a project
app.post('/api/projects/:id/qaqc', async (req, res) => {
  try {
    const projectId = req.params.id;
    const qaqcData = req.body;

    // Validate qaqcData if needed
    if (!qaqcData.element || !qaqcData.tests || !qaqcData.standards) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    // Find the project by ID and add the QAQC entry
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Add the QAQC entry to the project's qaqcEntries array
    project.qaqcEntries.push(qaqcData);

    // Save the updated project
    await project.save();

    res.status(201).json({ message: 'QAQC entry added successfully', qaqc: qaqcData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the QAQC entry' });
  }
});

// Route to add a Material entry to a project
app.post('/api/projects/:id/material', async (req, res) => {
  try {
    const projectId = req.params.id;
    const materialData = req.body;

    // Validate materialData if needed
    if (!materialData.element || !materialData.document || !materialData.docType) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    // Find the project by ID and add the Material entry
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Add the Material entry to the project's materialEntries array
    project.materialEntries.push(materialData);

    // Save the updated project
    await project.save();

    res.status(201).json({ message: 'Material entry added successfully', material: materialData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the Material entry' });
  }
});



mongoose.connect(
    "mongodb://localhost:27017/")
    .then(() => {
        console.log("Connected to the database");
    })
    .catch(() =>{
         console.log("Connection Failed");
    })


app.listen(4000,()=>{
    console.log('Server running on 4000');
})


