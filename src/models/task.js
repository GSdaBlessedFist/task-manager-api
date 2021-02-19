const chalk = require('chalk');
const validator = require('validator');
const p = console.log;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const taskSchema = new mongoose.Schema({
	description : {
		type: String,
        trim: true,
        required: false
	},
	completed : {
		type: Boolean,
        default: false
	}
})

// taskSchema.pre('save',async function(next){
// 	this.
// })

const Task = mongoose.model("Task", taskSchema);



module.exports = Task;