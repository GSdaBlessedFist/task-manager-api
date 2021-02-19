const p = console.log;
require("../src/db/mongoose");
const Task = require('../src/models/task');

// Task.findOneAndDelete("5fc1613ec81cb019141c40e3")
// 	.then((task)=>{
// 		console.log(task)
// 		return Task.countDocuments({completed:false})
// 	}).then((results)=>{
// 		console.log(results);
// 	}).catch((e)=>{
// 		console.log(e);
// 	})

const deleteTaskAndCount = async (id)=>{
	const deleting = await Task.findByIdAndDelete(id);
	const count = await Task.countDocuments({completed:false});
	return count;
}

deleteTaskAndCount("5fc7d9258ceb37e6d67f967c")
	.then((count)=>{
	p(count);
}).catch((e)=>{
	p("THis is an ERROr");
})