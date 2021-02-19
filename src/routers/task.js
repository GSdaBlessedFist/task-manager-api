const express = require("express");
const router = new express.Router();
const Task = require("../models/task");

router.post("/tasks", async(req, res) => {
    const task = new Task(req.body);

    try{
        const task = await task.save();
        res.status(201).send(task);
        p(chalk.red.inverse(task))
    }catch(error){
        res.status(400).send(error);  
    }
   
})
//GET requests//
router.get("/tasks",async(req,res)=>{

    try{
        const tasks = await Task.find({});
        res.send(tasks)
    }catch(error){
        res.status(500).send();
    }
})

router.get("/tasks/:id",async(req,res)=>{
	const _id = req.params.id;

    try{
        const task = await Task.findById({_id});
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch(error){
        res.status(500).send();
    }

})
//PATCH requests//-------------------------------------Resource Updating Endpoints: Part II
router.patch("/tasks/:id",async(req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ["completed","description","favorite"];
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));
    
    if(!isValidOperation){
        return res.status(400).send({error: "Invalid"})
    }

    try{
    	const task = await Task.findById(req.params.id);

    	updates.forEach((update)=>{
    		task[update]= req.body[update];
    		task.save();
    	})
        // const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,
        //     runValidators:true
        // })
        if(!task){
            return res.status(400).send();
        }
        res.send(task)
    }catch(e){
        res.status(400).send(e);
    }
})


//DELETE requests//
router.delete('/tasks/:id',async (req,res)=>{
    try{
        const task = await Task.findByIdAndDelete(req.params.id);

        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch(e){
        res.status(500).send();
    }
})

module.exports = router;