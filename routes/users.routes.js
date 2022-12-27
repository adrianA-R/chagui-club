const express = require("express");
const faker = require("faker");
const router = express.Router();

router.get('/', (req, res) => {
    res.json({name:"Adrian restrepo", edad:"21 años"});
});



module.exports = router;