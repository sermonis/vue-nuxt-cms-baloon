const customerService = require("../services/customer-service");

const { authUser, checkPermission } = require("../../../helpers/jtw");

module.exports = (router) => {

  router.get('/a', async (req, res, next) => {
    const customers = await customerService.findAll();

    res.send(customers)

  });

  router.post('/list-customer-type', authUser, async (req, res, next) => {
    try {
      const customers = await customerService.findAll();
      const customersTypes = await customerService.customerType.find().sort('-id');
      res.send({ customers, customersTypes })
    } catch (error) {
      next(error);
    }
  });

  router.post('/list-customer', authUser, async (req, res, next) => {
    try {
      const customers = await customerService.model.find().select('_id name');
      res.send(customers)
    } catch (error) {
      next(error);
    }
  });

  /*router.post('/list', authUser, async (req, res, next) => {
    try {
      const customers = await customerService.findAll();
      res.send(customers)
    } catch (error) {
      next(error);
    }
  });
  */

  router.post('/add-customer-type', async (req, res, next) => {
    
  });

  return router;
}