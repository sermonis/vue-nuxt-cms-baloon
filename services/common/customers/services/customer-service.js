const CustomerModel = require("../models/customer-model");
const CustomerTypeModel = require("../models/customer-type-model");
const BaseService = require('../../../db/base-service');

class CustomerService extends BaseService{
  model = CustomerModel; 
  customerType = CustomerTypeModel;

  #customerTypes = [
    { id: 1, name: "Acenta" },
    { id: 2, name: "Hotel" },
    { id: 3, name: "Rehber" },
    { id: 4, name: "Balon Firması" },
    { id: 5, name: "Münferit" },
    { id: 6, name: "Misafir" },
    { id: 7, name: "Personel" },
  ];
} 

module.exports = new CustomerService();

/*
const regex = /^([0-9]+)\.([0-9]{2})/g;
const value = "12.53";
regex.test(value)
*/