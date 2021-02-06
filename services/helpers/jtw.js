const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const redis = require("./init-redis");
module.exports = {

  signAccessToken: user => {
    return new Promise((resolve, reject) => {
      const secret = process.env.AUTH_KEY;
      const options = {
        expiresIn: "30d"
      };

      JWT.sign(user, secret, options, (err, token) => {
        if (err) {
          console.log("jst sign error", err.message);
          reject(createError(401, "Oturumunuz sona erdi"));
          return;
        }
        resolve(token);
      });
    });
  },

  verifyAccessToken: token => {
    return new Promise((resolve, reject) => {
      const secret = process.env.AUTH_KEY;
      JWT.verify(token, secret, (err, decoded) => {
        if (err) {
          console.log("jst verify error", err.message);
          reject(createError(401, "Oturumunuz sona erdi"));
          return;
        }
        resolve(decoded);
      });
    });
  },

  authUser: (req, res, next) => {
    if (!req.headers["ip"]) {
      console.log("no ip provided");
      throw new Error("400 || Oturumunuz sona erdi");
    }
    
    const header = req.header('Authorization');

    if ( ! header ) {
      console.log("no Authorization provided");
      throw new Error("400 || Oturumunuz sona erdi");
    }
    
    const token = header.split(' ')[1];

    JWT.verify(token, process.env.AUTH_KEY, (err, payload) => {
      if (err) {
        throw new Error("401 || Oturumunuz sona erdi");
      }

      redis.get(payload.sid).then(result => {
        if( ! result ){
          throw new Error("401 || Oturumunuz sona erdi");
        }
        
        const data = JSON.parse(result);

        if( !( req.headers['ip'] && req.headers['ip'] == data.ip) ||  data.accessToken != token && !( req.headers['user-agent'] && req.headers['user-agent'] == data.userAgent ) ){
          console.log("ip or token or useragent changed"); // Prints "bar"
          throw new Error("401 || Oturumunuz sona erdi");
        }

        req.user = data.user;
        
        next();
        
      }).catch(error => {
        console.log(error);
        throw new Error("401 || Oturumunuz sona erdi");
      });

    });

  }
}