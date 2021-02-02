module.exports = class Service {
  async findAll( obj = {} ) {
    return this.model.find(obj);
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