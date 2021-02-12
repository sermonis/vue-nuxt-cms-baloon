const BalloonModel = require("../models/balloon-model");
const BaseService = require("../../../db/base-service");
const LogService = require("../../user/services/log-service");
class BalloonService extends BaseService {
  model = BalloonModel;
  #logService = LogService;

  async Balloons(obj = {}) {
    return this.model.find(obj, { envelope: 0, basket: 0, sensor: 0, burner: 0, cylinders: 0, __v: 0, crew: 0 }).sort('+volume');
  }

  async createLog(req, content = "düzenlendi"){
    await this.#logService.add({
      user: req.user._id,
      module: "Balon",
      content: `${req.body.registration} ${content}`,
      ip: req.headers["ip"]
    });
  }
  
}

module.exports = new BalloonService();
