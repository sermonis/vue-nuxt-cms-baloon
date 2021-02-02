const LogModel = require("../models/log-model");
const BaseService = require('../../../db/base-service');
class LogService extends BaseService {
  model = LogModel;

}

module.exports = new LogService();