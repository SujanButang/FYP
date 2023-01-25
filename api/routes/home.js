const express = require("express");
const events = require("../models/Events")
const router = express.Router();

router.get("/home", async(req, res)=>{
    try{

        res.status(200).json(events.findAll({limit: 10}))
    }
    catch(err){
        res.json(err);
    }
});

module.exports = router;