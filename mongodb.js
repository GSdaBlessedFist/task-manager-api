// CRUD
const chalk = require('chalk');
const { MongoClient, ObjectID} = require('mongodb');
const p = console.log;

const connectionURL = 'mongodb://127.0.0.1:27017';
const database = 'task-manager';

MongoClient.connect(connectionURL,{useUnifiedTopology: true},(error,client)=>{
	if(error){
		return p("Unable to connect");
	}

	const db = client.db(database)

	// db.collection('users').updateOne({
	// 	_id: new ObjectID("5fb6fb645bc54444afc2525f")
	// },{
	// 	$inc: {
	// 		age: 1
	// 	}
	// }).then((result)=>{
	// 	p(result)
	// }).catch((error)=>{
	// 	p("ERROR:",error)
	// })

	// db.collection('tasks').updateMany({
	// 	completed: true
	// },{
	// 	$set:{
	// 		completed: false,
	// 		timeofDay: "later"
	// 	}
	// }).then((result)=>{
	// 	p(chalk.green.inverse(result));
	// }).catch((error)=>{
	// 	p(chalk.red.inverse(error));
	// })

	// db.collection("tasks").insertMany([{
	// 	description: "Chuck the woodchuck",
	// 	favorite: false
	// },{
	// 	description: "Narthle the Garthak",
	// 	favorite: true
	// }])

	// db.collection("tasks").updateOne({
	// 	description: "Go to the gym"
	// },{
	// 	$set:{
	// 		description: "Run some laps",
	// 		favorite: false
	// 	}
	// }).then((result)=>{
	// 	p(result)
	// }).catch((error)=>{
	// 	p("ERROR",error)
	// })

	db.collection('tasks').deleteOne({
		description: "Eat less junk food"
	}).then((result)=>{
		p(result)
	}).catch((error)=>{
		p("ERROR",error)
	})


});

