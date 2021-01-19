const express = require("express");

const router = express.Router();

const redis = require('../../helpers/init-redis');

const userService = require('../services/user-service');

const loginCheck = require("../middleware/login");

const { signAccessToken, verifyAccessToken } = require('../helpers/jtw');

const authCheck = require('../../middleware/auth');

router.post('/auth', authCheck, async ( req, res, next ) => {
  res.send({
    token: req.body.token,
    user: req.user
  })
});


router.post('/refresh', async (req, res, next ) => {
  try {

    const token = req.body.token;

    if( ! token ){
      console.log("old token not provided");
      throw new Error("401 || error.sessionExpired");
    }
    const user = await verifyAccessToken(token);

    redisData = await redis.get( user._id );
    
    if( ! redisData ){
      console.log("old redisData not founded");
      throw new Error("401 || error.sessionExpired");
    }

    const data = JSON.parse(redisData);
    if( !( req.headers['ip'] && req.headers['ip'] == data.ip) || ! data.accessToken == token && !( req.headers['user-agent'] && req.headers['user-agent'] == data.userAgent ) ){
      console.log("ip or token or useragent changed"); 
      throw new Error("401 || error.sessionExpired");
    }

    await redis.setex(user._id, (60 * 60 * 24), redisData  );

    res.send( { user: user } );

  } catch (error) {
    next(error);
  }
  
});

router.post("/login", loginCheck, async (req, res, next) => {
  try {

    const loginAttemps = await redis.get(req.headers['ip']);

    if(loginAttemps && loginAttemps > 5) {
      throw new Error('400 || error.loginAttemps');
    }

    const user = await userService.findOne({ username: req.body.username })

    if( ! user ) {
      await redis.setex(req.headers['ip'], 300, loginAttemps ? parseInt(loginAttemps) + 1 : 1 );
      throw new Error('400 || error.notValidUserPassword')
    }
    
    const validPassword = await user.isValidPassword( req.body.password );

    if ( ! validPassword){
      await redis.setex(req.headers['ip'], 300, loginAttemps ? parseInt(loginAttemps) + 1 : 1 );
      throw new Error('400 || error.notValidUserPassword');
    }

    user.lastLogin = new Date().toISOString();
    user.lastLoginIp = req.headers['ip'];
    await user.save();

    delete user._doc.password;
    console.log(user._doc);
    const token = await signAccessToken(user._doc);

    const redisData = {
      accessToken: token, 
      userAgent: req.headers['user-agent'],
      ip: req.headers['ip']
    }

    await redis.setex(user._id, (60 * 60 * 24), JSON.stringify(redisData)  );

    res.send( {
      token: token,
      user: user
    });
    
  } catch (error) {
    next(error);
  }
       
});

module.exports = router;
