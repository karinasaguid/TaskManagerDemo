const Task = require("../models/Task");
const {validateObjectId} = require("../utils/Validation");

exports.getTasks = async(req,res)=>{
    try{
        const tasks = await Task.find({user: req.user.id});
        res.status(200).json({tasks, status: true, msg: "Tasks found successfully!"});
    } catch(err){
        console.error(err);
        return res.status(500).json({status: false, msg: "Internal Server Error!"})
    }
}

exports.getTask = async (req, res) => { 
    try { 
        if (!validateObjectId(req.params.taskId)) { 
            return res.status(400).json({ status: false, msg: "Task id not valid" }); 
        } 
  
        const task = await Task.findOne({ user: req.user.id, _id: req.params.taskId }); 
        if (!task) { 
            return res.status(400).json({ status: false, msg: "No task found.." }); 
        } 
        res.status(200).json({ task, status: true, msg: "Task found successfully.." }); 
    } 
    catch (err) { 
        console.error(err); 
        return res.status(500).json({ status: false, msg: "Internal Server Error" }); 
    } 
} 

exports.getTasks = async (req, res) => {
    try {
        let query = { user: req.user.id };

        // Sorting
        if (req.query.sortByStatus) {
            query = { ...query, status: req.query.sortByStatus };
        }

        const tasks = await Task.find(query);
        res.status(200).json({ tasks, status: true, msg: "Tasks found successfully!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ status: false, msg: "Internal Server Error!" })
    }
}

exports.postTask = async (req, res) => { 
    try { 
        const { title, description, dueDate, status } = req.body; 

        // Check if any of the required fields are missing
        if (!title || !description || !dueDate || !status) { 
            return res.status(400).json({ status: false, msg: "All fields are required" }); 
        } 

        // Create the task with all required fields
        const task = await Task.create({ 
            user: req.user.id, 
            title, 
            description, 
            dueDate, 
            status 
        }); 

        res.status(200).json({ task, status: true, msg: "Task created successfully.." }); 
    } 
    catch (err) { 
        console.error(err); 
        return res.status(500).json({ status: false, msg: "Internal Server Error" }); 
    } 
}

  
exports.updateTask = async (req, res) => { 
    try { 
        const { title, description, dueDate, status } = req.body; 

        // Check if any of the required fields are missing
        if (!title && !description && !dueDate && !status) { 
            return res.status(400).json({ status: false, msg: "At least one field to update is required" }); 
        } 

        if (!validateObjectId(req.params.taskId)) { 
            return res.status(400).json({ status: false, msg: "Task id not valid" }); 
        } 
  
        let task = await Task.findById(req.params.taskId); 
        if (!task) { 
            return res.status(400).json({ status: false, msg: "Task with given id not found" }); 
        } 
  
        if (task.user != req.user.id) { 
            return res.status(403).json({ status: false, msg: "You can't update task of another user" }); 
        } 

        // Construct the update object with provided fields
        const updateFields = {};
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (dueDate) updateFields.dueDate = dueDate;
        if (status) updateFields.status = status;

        task = await Task.findByIdAndUpdate(req.params.taskId, updateFields, { new: true }); 
        res.status(200).json({ task, status: true, msg: "Task updated successfully.." }); 
    } 
    catch (err) { 
        console.error(err); 
        return res.status(500).json({ status: false, msg: "Internal Server Error" }); 
    } 
}

  
  
exports.deleteTask = async (req, res) => { 
    try { 
        if (!validateObjectId(req.params.taskId)) { 
            return res.status(400).json({ status: false, msg: "Task id not valid" }); 
        } 
  
        let task = await Task.findById(req.params.taskId); 
        if (!task) { 
            return res.status(400).json({ status: false, msg: "Task with given id not found" }); 
        } 
  
        if (task.user != req.user.id) { 
            return res.status(403).json({ status: false, msg: "You can't delete task of another user" }); 
        } 
  
        await Task.findByIdAndDelete(req.params.taskId); 
        res.status(200).json({ status: true, msg: "Task deleted successfully.." }); 
    } 
    catch (err) { 
        console.error(err); 
        return res.status(500).json({ status: false, msg: "Internal Server Error" }); 
    } 
}