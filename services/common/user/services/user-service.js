const UserModel = require("../models/user-model");

class UserService {
  model = UserModel;

  async findAll() {
    return this.model.find();
  }

  async add(item) {
    return this.model.create(item);
  }

  async del(itemId) {
    return this.model.deleteOne({ _id: itemId });
  }

  async find(itemId) {
    return this.model.findById(itemId);
  }

  async findOne(obj) {
    return this.model.findOne(obj);  
  }
  
}

module.exports = new UserService();
