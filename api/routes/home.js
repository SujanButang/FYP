const express = require("express");
const events = require("../models/Events")
const router = express.Router();

router.get("/home", async(req, res)=>{
    try{
        const carousalEvents = await events.findAll({limit:10})
        res.status(200).json(carousalEvents)
    }
    catch(err){
        res.json(err);
    }
});

module.exports = router;