

const controller = require("../middleware/balloon");

const BalloonService = require('../services/balloon-service');

const { authUser, checkPermission } = require("../../../helpers/jtw");


module.exports = (router) => {

  router.post('/list',authUser, async (req, res, next ) => {
    try {
      const balloons = await BalloonService.findAll();
      res.send(balloons);
    } catch (error) {
      next(error)
    }
  });

  router.post('/add',[ controller.addBalloon, authUser, checkPermission('addBalloon') ], async (req, res, next) => {
    try {

      const check = await BalloonService.findOne({ registration: req.body.registration });

      if( check ){
        throw new Error('401 || Böyle bir tescil zaten var');
      }

      const balloon = await BalloonService.add(req.body);

      await BalloonService.createLog(req, "eklendi");

      res.send(balloon);

    } catch (error) {
      next(error);
    }
  });

  router.post('/edit',[ controller.editBalloon, authUser, checkPermission('editBalloon')  ], async (req, res, next) => {
    try {

      const check = await BalloonService.find( req.body._id );

      if( ! check ){
        throw new Error('401 || Böyle bir balon bulunamadı');
      }

      const balloon = await BalloonService.findByIdAndUpdate({ ...req.body } );

      if( ! req.body.hasOwnProperty('customer') && balloon.hasOwnProperty('customer') ){
        delete balloon.customer;
        balloon.save();
      }
     
      const log = (balloon,post) => {
        if( balloon.status != post.status ){
          return post.status == "Aktif" ? "durumu aktifleştirildi" : "durumu pasifleştirildi";
        }
        return "düzenlendi";
      }

      await BalloonService.createLog(req, log(check,req.body));

      res.send( balloon );

    } catch (error) {
      next(error);
    }

  });

  
  router.get('/', async (req, res, next ) => {
      //const balloon = await BalloonService.add({ registration: "TC-BUE" })
      //const balloon = await BalloonService.add({ registration: "TC-BUJ", volume: 0 })
      
      //const io = req.app.get('io');
      //io.sockets.emit('event1', "world");
      //console.log(io.sockets);


      const editedItem = {
        _id: "",
        registration: 'TC-BKA',
        volume: 0,
        pilotCapacity: '',
        passengerCapacity: '',
        customer: '',
        insurance: ''
      }

      function clean(obj) {
        for (var propName in obj) {
          if ( ! obj[propName] ) {
            delete obj[propName];
          }
        }
        return obj
      }
      //res.send(clean(editedItem))
      /*
      try {
       
        const balloons = await BalloonService.findAll();
        res.send(balloons);
      } catch (error) {
        res.send(error)
      }

      */

      const logService = require("../../user/services/log-service");
      
      const logs = await logService.model.find().sort('-createdAt')

      res.send(logs)
      

  });


  return router;

}
