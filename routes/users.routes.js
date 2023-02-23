const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../lib/access");
const UsersServices = require('../services/users.services');

const service = new UsersServices();

router.get('/', isLoggedIn, async (req, res) => {
   const { id,username,email,name } = req.user;
   res.render("users/profile",{id,username,email,name});
}); 
  
module.exports = router;