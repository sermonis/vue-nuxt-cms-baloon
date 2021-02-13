

const controller = require("../middleware/balloon");

const BalloonService = require('../services/balloon-service');

const { authUser } = require("../../../helpers/jtw");


module.exports = (router) => {

  router.post('/list',authUser, async (req, res, next ) => {
    try {
      const balloons = await BalloonService.findAll();
      res.send(balloons);
    } catch (error) {
      next(error)
    }
  });

  router.post('/add',[ controller.addBalloon, authUser ], async (req, res, next) => {
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

  router.post('/edit',[ controller.editBalloon, authUser ], async (req, res, next) => {
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

      function gridGenerateExcel(title) { 
        var grid = {data: [{a:1,b:"one"},{a:2,b:"two"}], columns:[{id:'a', kindid:'int',type:'number', width: 100},{id:'b',kindid:'string',type:'string', width: 100}]}; 
        var s = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" \
        xmlns="http://www.w3.org/TR/REC-html40"><head> \
        <meta charset="utf-8" /> \
        <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets> \
          <x:ExcelWorksheet><x:Name>' + title + '</x:Name><x:WorksheetOptions><x:DisplayGridlines/>     </x:WorksheetOptions> \
        </x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>';
    
        s += '<colgroups>';
        grid.columns.forEach(function (col) {
            s += '<col style="width: '+col.width+'px"></col>';
        });
    
        s += '<thead><tr>';
        grid.columns.forEach(function (col) {
            s += '<th style="background-color: #E5E5E5; border: 1px solid black;">' + col.name + '</th>';
        });
    
        s += '<tbody>';
        grid.data.forEach(d => {
            s += '<tr>';
    
            grid.columns.forEach(function (col) {
                var value = d[col.id];
    
                s += '<td ';
                if (col.kindid == "money") {
                   s += "style = 'mso-number-format:\"\\#\\,\\#\\#0\\\\ _р_\\.\";white-space:normal;'"; 
                } else if (col.type == "numeric") s += "";//" style = 'mso-number-format:\"\\@\";'";
                else if (col.kindid == "date") s += " style='mso-number-format:\"Short Date\";'";
                else s += " style='mso-number-format:\"\\@\";'";
                s += '>';
                if( ! value ) { 
                    s += ''; 
                } else s += d[col.id];
            });
        });
        s += '</table></body></html>';
    
        return s;
    }
     
      res.send(gridGenerateExcel('ali'))
      

  });


  return router;

}
