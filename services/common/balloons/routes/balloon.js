const express = require("express");

const router = express.Router();

const redis = require("../../../helpers/init-redis");

const BalloonService = require('../services/balloon-service');

const { signAccessToken, verifyAccessToken } = require("../../../helpers/jtw");
/*
const authCheck = require("../../middleware/auth");

router.post("/auth", authCheck, async (req, res, next) => {
  res.send({
    token: req.body.token,
    user: req.user
  });
});
*/

router.post('/list', async (req, res, next ) => {
  try {
    const balloons = await BalloonService.findAll();
    res.send(balloons);
  } catch (error) {
    next(error)
  }
});

router.get('/balloons', async (req, res, next ) => {  
  const io = req.app.get('io');
    
  res.send("ok")

});
router.get('/', async (req, res, next ) => {
    //const balloon = await BalloonService.add({ registration: "TC-BUE" })
    //const balloon = await BalloonService.add({ registration: "TC-BUJ", volume: 0 })
    
    const io = req.app.get('io');
    io.sockets.emit('event1', "world");
    //console.log(io.sockets);
    res.send("ok")
    

});


module.exports = router;
