const UserModel = require("../models/user-model");
const BaseService = require('../../../db/base-service');

class UserService extends BaseService{
  model = UserModel; 

  permissions = [
    "addBalloon",
    "editBalloon",
    "viewBalloons",
    "viewCustomers",
    "addCustomer",
    "editCustomer"
  ]

}

module.exports = new UserService();

/*
const regex = /^([0-9]+)\.([0-9]{2})/g;
const value = "12.53";
regex.test(value)
*/