const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/authentication");

//SIGN IN
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({
      user,
      token
    });
  } catch (error) {
    res.status(400).send(error);
  }
})
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.passkey);
    const token = await user.generateAuthToken();
    res.send({
      user,
      token
    });
  } catch (e) {
    res.status(400).send();
    console.log(e)
  }
})
//GET requests//
router.get("", (req, res) => {
  res.send("Welcome to the API homepage" + "</br>" + "use '\/users' or '\/tasks' at the end of the webaddress");
})

router.get("/users/me", auth, async (req, res) => {

  res.send(req.user);

})
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send()
    }
    res.send(user)
  } catch (error) {
    res.status(500).send();
  }

  p(req.params);
})
// PATCH requests //
router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "passkey", "age"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({
      error: "Invalid"
    })
  }

  try {
    const user = await User.findById(req.params.id);

    updates.forEach((update) => {
      user[update] = req.body[update];
      user.save();
    })

    //const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,
    //  runValidators:true
    //})
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
})
//DELETE requests//
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }
    res.send(user)
  } catch (e) {
    res.status(500).send();
  }
})

module.exports = router;