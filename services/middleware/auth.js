const JWT = require("jsonwebtoken");
const redis = require("../helpers/init-redis");
module.exports = (req, res, next) => {
  /*const authHeader = req.headers["authorization"];
  console.log(req.headers);
  const token = authHeader && authHeader.split(" ")[1];
  if ( ! token ) {
    console.log("auth token not valid");
    throw new Error("401 || error.sessionExpired");
  }
  */
  const token = req.body.token;
  JWT.verify(token, process.env.AUTH_KEY, (err, payload) => {
    if (err) {
      console.log(err);
      throw new Error("401 || error.sessionExpired");
    }
    req.user = payload; 
    redis.get(req.user._id).then(result => {
      const data = JSON.parse(result);
      if( ! data ){
        console.log("token not found"); // Prints "bar"
        throw new Error("401 || error.sessionExpired");
      }
      
      if( !( req.headers['ip'] && req.headers['ip'] == data.ip) || ! data.accessToken == token && !( req.headers['user-agent'] && req.headers['user-agent'] == data.userAgent ) ){
        console.log("ip or token or useragent changed"); // Prints "bar"
        throw new Error("401 || error.sessionExpired");
      }
      
      redis.setex(req.user._id, (60 * 60 * 24), result  ).then(result => {
        next();
      }).catch(error => {
        console.log(error);
        throw new Error("401 || error.sessionExpired");
      })
      
    }).catch(error => {
      console.log(error);
      throw new Error("401 || error.sessionExpired");
    });
  });
}
