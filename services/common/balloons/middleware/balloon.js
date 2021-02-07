module.exports = {
  addBalloon: (req, res, next) => {

   
    /**
     * Tescil
    */

    if (!( req.body.registration && req.body.registration.substr(0, 4) === "TC-B" && req.body.registration.length === 6 ) ) {
      throw new Error("400 || Lütfen geçerli bir tescil giriniz");
    }


    /** 
     * Volume 
    */

    if( ! ( req.body.volume && /^\d+$/.test(req.body.volume) && Number.isInteger(req.body.volume) && req.body.volume > 0 )){
      throw new Error("400 || Lütfen geçerli bir hacim giriniz");
    }

    /** 
     * passengerCapacity 
    */

    if( ! ( req.body.passengerCapacity && /^\d+$/.test(req.body.passengerCapacity) && Number.isInteger(req.body.passengerCapacity) && req.body.passengerCapacity > 0 )){
      throw new Error("400 || Lütfen geçerli bir yolcu sayısı giriniz");
    }

    
    /** 
     * pilotCapacity 
    */

    if( ! ( req.body.pilotCapacity && /^\d+$/.test(req.body.pilotCapacity) && Number.isInteger(req.body.pilotCapacity) && req.body.pilotCapacity > 0 )){
      throw new Error("400 || Lütfen geçerli bir pilot sayısı giriniz");
    }

    /** 
     * customer 
    */

    if( req.body.customer ){
      if( ! ( /^(0x|0h)?[0-9A-F]+$/i.test(req.body.customer._id) && req.body.customer._id.length === 24 ) ){
        delete req.body.customer;
      }
    }

    if( req.body._id  &&  ! ( /^(0x|0h)?[0-9A-F]+$/i.test(req.body._id) && req.body._id.length === 24 ) ){
      delete req.body._id;
    }
    console.log(req.body);
    next(); // pass the execution off to whatever request the client intended
  }
}