const p = console.log;
const chalk = require('chalk');
const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');


const app = express();
const port = process.env.PORT || 3000;

// app.use((req,res,next)=>{
// 	if(req.method){
// 		res.status(503).send("MAINTENANCE happening");
// 	}else{
// 		next();
// 	}
// })

app.use(express.json())
app.use(userRouter);
app.use(taskRouter);



app.listen(port, () => {
    p("...server's connected on port" + port);
    p(chalk.green.bold("MongoDB must be running"));
})

/////////////////////////////////////////////////////////JSONWEBTOKEN EXAMPLE
const jwt = require("jsonwebtoken");

const myFunction = async ()=>{
	const token = jwt.sign({ _id:"dummyid" },"$%$%#$",{expiresIn:"7 days"});
	console.log(token);
	const data = jwt.verify(token,"$%$%#$");
	console.log(data);
}

myFunction()





// --------------HASHING example-------------- //
// const bcrypt = require('bcryptjs');

// const myFunction = async ()=>{
//     const password = "Red12346!";
//     const hashedPassword = await bcrypt.hash(password,8);

//     console.log(password);
//     console.log(hashedPassword);

//     const isMatch = await bcrypt.compare("Red12346!",hashedPassword);
//     console.log(isMatch)
// }