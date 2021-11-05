const express = require("express");
const auth = require("../middleware/auth");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../model/User");


router.get("/list", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json(user.shoppinglist)
    } catch (e) {
      res.send({ message: "Error in Fetching list" });
    }
  });

router.post("/add", auth, async (req, res) => {
  try {
    const item = req.body.item;
    const user = await User.findById(req.user.id);
    user.shoppinglist.push(item);
    await user.save();
    res.json(user.shoppinglist);
  } catch (e) {
    res.send({message: "Error in adding item"})
  }
})

router.delete("/delete", auth, async (req, res) => {
  try {
    const item = req.body.item
    const user = await User.findById(req.user.id);
    for (let i=0; i < user.shoppinglist.length; i+=1) {
      if (user.shoppinglist[i]==item) {
        user.shoppinglist.splice(i, 1);
        break;
      }
    }
    await user.save();
    res.json(user.shoppinglist);
  } catch (e) {
    res.send({message: "Error in deleting item"});
  }
})

  module.exports = router;