// let ip =
//     req.headers['x-forwarded-for'] || // From proxy headers, can be spoofed if you don't have a proxy in front of your app, so drop it if your app is naked.
//     req.connection.remoteAddress ||
//     req.socket.remoteAddress || // socket is an alias to connection, just delete this line
//     req.connection.socket.remoteAddress // no idea where this might be a thing, just delete this line
//   // probably add a default at the end here, although there shouldn't be a case when req.connection.remoteAddress is unset.
//   if (ip.substr(0, 7) == "::ffff:") {
//     ip = ip.substr(7);
//   }
//console.log(ip);

module.exports = {
  login: (req, res, next) => {
    if (!req.body.username) {
      throw new Error("400 || Kullanıcı adı boş bırakılamaz");
    }

    if (!req.headers["ip"]) {
      throw new Error("400 || No ip provided");
    }

    if (!req.body.password) {
      throw new Error("400 || Şifre adı boş bırakılamaz");
    }

    if (req.body.username.length < 4 || req.body.username.length > 10) {
      throw new Error("400 || Kullanıcı adınız en az 4 en fazla 10 karakter içermelidir");
    }

    if (req.body.password.length < 4 || req.body.password.length > 10) {
      throw new Error("400 || Şifreniz adınız en az {min} en fazla {max} karakter içermelidir");
    }

    if (!/(^[\w-]{4,10})+$/.test(req.body.password)) {
      throw new Error("400 || Yalnızca harf(a-z), rakam (0-9), tire(-) ve alt tre (_) kullanılabilir");
    }

    if (!/(^[\w-]{4,10})+$/.test(req.body.username)) {
      throw new Error("400 || Yalnızca harf(a-z), rakam (0-9), tire(-) ve alt tre (_) kullanılabilir");
    }
    next(); // pass the execution off to whatever request the client intended
  }
};
