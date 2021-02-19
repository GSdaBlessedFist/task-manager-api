const p = console.log;
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req,res,next)=>{

	try{
		const token = req.header('Authorization').replace("Bearer ","");
		
		const decoded = jwt.verify(token,"japan");
		
		const user = await User.findOne({_id:decoded._id,"tokens.token":token});
		p(typeof decoded)
		if(!user){
			throw new Error();
		}
		req.user = user;
		next();
	}catch(e){}
		res.status(401).send({error:"Please authenticate"});
next();

}

module.exports = auth;