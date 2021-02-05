const BalloonModel = require("../models/balloon-model");
const BaseService = require("../../../db/base-service");

class BalloonService extends BaseService {
  model = BalloonModel;

  async Balloons(obj = {}) {
    return this.model.find(obj, { envelope: 0, basket: 0, sensor: 0, burner: 0, cylinders: 0, __v: 0, crew: 0 }).sort('+volume');
  }
  
}

module.exports = new BalloonService();
