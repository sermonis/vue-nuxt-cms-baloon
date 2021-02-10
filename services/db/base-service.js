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

  async findByIdAndUpdate(obj) {
    const { _id } = obj;  delete obj._id;
    return this.model.findByIdAndUpdate( _id, obj, { new: true } );
  }

  async findOneAndUpdate( search, obj ) {
    return this.model.findOneAndUpdate( search, obj, { new: true } );
  }

}