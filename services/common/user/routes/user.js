const redis = require("../../../helpers/init-redis");

const userService = require("../services/user-service");

const logService = require("../services/log-service");

const controller = require("../middleware/login");

const { signAccessToken, verifyAccessToken } = require("../../../helpers/jtw");

module.exports = (router) => {

  

  router.post("/refresh", async (req, res, next) => {
    try {
      const token = req.body.token;

      if (!token) {
        console.error("old token not provided");
        throw new Error("401 || error.sessionExpired");
      }

      const user = await verifyAccessToken(token);

      const redisData = await redis.get(user.sid);

      if (!redisData) {
        console.error("old redisData not found");
        throw new Error("401 || error.sessionExpired");
      }

      const data = JSON.parse(redisData);

      if ( !(req.headers["ip"] && req.headers["ip"] == data.ip) || !data.accessToken == token || !( req.headers["user-agent"] && req.headers["user-agent"] == data.userAgent ) ) {
        console.log("ip or token or useragent changed");
        throw new Error("401 || error.sessionExpired");
      }

      await redis.setex(user.sid, 60 * 60 * 24 * 30, redisData);

      res.send({
        user: data.user
      });

    } catch (error) {
      next(error);
    }
  });

  router.post("/login", controller.login, async (req, res, next) => {
    try {
      const loginAttemps = await redis.get(req.headers["ip"]);

      if (loginAttemps && loginAttemps > 5) {
        throw new Error("400 || Maximum deneme sayısına ulaştınız. 5dk sonra tekrar deneyiniz");
      }

      const user = await userService.findOne({ username: req.body.username });
      
      if (!user) {
        await redis.setex( req.headers["ip"], 300, loginAttemps ? parseInt(loginAttemps) + 1 : 1 );
        throw new Error("400 || Kullanıcı veya şifre geçerli değil");
      }

      const validPassword = await user.isValidPassword(req.body.password);

      if (!validPassword) {
        await redis.setex( req.headers["ip"], 300, loginAttemps ? parseInt(loginAttemps) + 1 : 1 );
        throw new Error("400 || Kullanıcı veya şifre geçerli değil");
      }

      if( user.rank == "blocked" ){
        await redis.setex( req.headers["ip"], 300, loginAttemps ? parseInt(loginAttemps) + 1 : 1 );
        throw new Error("400 || Bu hesap yasaklıdır");
      }

      logService.add({
        user: user._id,
        module: "Login",
        content: `${user.name}'s Sisteme giriş yapıldı`,
        ip: req.headers["ip"]
      });
      
      user.lastLogin = new Date().toISOString();
      user.lastLoginIp = req.headers["ip"];
      await user.save();

      const token = await signAccessToken({ sid: user._id });
      delete user._doc.password;
      delete user._doc.__v;
      const redisData = {
        accessToken: token,
        userAgent: req.headers["user-agent"],
        ip: req.headers["ip"],
        user: user._doc
      };

      await redis.setex(user._id, 60 * 60 * 24 * 30, JSON.stringify(redisData));

      res.send({
        token: token,
        user: user._doc
      });
    } catch (error) {
      next(error);
    }
  });

  return router;

}