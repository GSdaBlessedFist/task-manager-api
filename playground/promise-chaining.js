const p = console.log;
require('../src/db/mongoose');
const User = require('../src/models/user');


//5fbeeaa8363bcc15ae195d7d

// User.findByIdAndUpdate("5fc03a47a3c25821e10fd782",{age:99})
// 	.then((user)=>{
// 		console.log(user);
// 		return User.countDocuments({age:25})
// 	}).then((result)=>{
// 		console.log("The amount of users with that info is " + result);
// 	}).catch((error) => {
// 		console.log(e)
// 	})

const updateAgeAndCount = async (id,age)=>{
	const user = await User.findByIdAndUpdate(id,{age});
	const count = await User.countDocuments({age});
	return count
}

updateAgeAndCount("5fc03a47a3c25821e10fd782",45)
	.then((count)=>{
		p(count);
	}).catch((e)=>{
		p(e)
	})