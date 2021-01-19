const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  signAccessToken: user => {
    return new Promise((resolve, reject) => {
      const secret = process.env.AUTH_KEY;
      const options = {
        expiresIn: "24h"
      };
  
      JWT.sign(user, secret, options, (err, token) => {
        if (err) {
          console.log("jst sign error",err.message);
          reject(createError(401, "error.sessionExpired"));
          return;
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken: token => {
    return new Promise((resolve,reject) => {
      const secret = process.env.AUTH_KEY;
      JWT.verify(token,secret,(err,decoded) => {
        if (err) {
          console.log("jst verify error",err.message);
          reject(createError(401, "error.sessionExpired"));
          return;
        }
        resolve(decoded);
      }); 
    });
  }
} 
