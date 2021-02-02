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

router.get('/', async (req, res, next ) => {
    //const balloon = await BalloonService.add({ registration: "TC-BUE" })
    //const balloon = await BalloonService.add({ registration: "TC-BUN", volume: 1.12 })
    const balloons = await BalloonService.Balloons();
    res.status(200);
    res.send(/^([0-9]+)?(.[0-9]{2})?/g.test("12.2-") ? "regex ok" : "failled")
});


module.exports = router;
