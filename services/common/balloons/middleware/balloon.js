
const defaults = post => {
  console.log(post);
  /**
   * Tescil
  */
  if ( ! ( post.hasOwnProperty('registration') && /^(TC-B)([A-Z]{2})+$/.test( post.registration ) ) ) {
  //if (!( post.hasOwnProperty('registration') && post.registration.substr(0, 4) === "TC-B" && post.registration.length === 6 ) ) {
    throw new Error("400 || Lütfen geçerli bir tescil giriniz");
  }

  /** 
   * Volume 
  */

  if( ! ( post.hasOwnProperty('volume') && /^\d+$/.test(post.volume) && Number.isInteger(post.volume) && post.volume > 0 )){
    throw new Error("400 || Lütfen geçerli bir hacim giriniz");
  }

  /** 
   * passengerCapacity 
  */

  if( ! ( post.hasOwnProperty('passengerCapacity') && /^\d+$/.test(post.passengerCapacity) && Number.isInteger(post.passengerCapacity) && post.passengerCapacity > 0 )){
    throw new Error("400 || Lütfen geçerli bir yolcu sayısı giriniz");
  }

  /** 
   * pilotCapacity 
  */

  if( ! ( post.hasOwnProperty('pilotCapacity') && /^\d+$/.test(post.pilotCapacity) && Number.isInteger(post.pilotCapacity) && post.pilotCapacity > 0 )){
    throw new Error("400 || Lütfen geçerli bir pilot sayısı giriniz");
  }
  
  /** 
   * status 
  */

  if( ! ( post.hasOwnProperty('status') && ['Aktif','Pasif','Kiralik'].includes(post.status) ) ){
    throw new Error("400 || Lütfen geçerli bir pilot sayısı giriniz");
  }

};

module.exports = {
  addBalloon: (req, res, next) => {

    defaults( req.body );

    if( req.body._id  &&  ! ( /^(0x|0h)?[0-9A-F]+$/i.test(req.body._id) && req.body._id.length === 24 ) ){
      delete req.body._id;
    }

    /** 
      * customer 
    */

    if( req.body.hasOwnProperty('customer') ){
      if( ! ( /^(0x|0h)?[0-9A-F]+$/i.test(req.body.customer?._id) && req.body.customer._id.length === 24 ) ){
        delete req.body.customer;
      }
    }

    console.log(req.body);
    next(); // pass the execution off to whatever request the client intended
  },

  editBalloon: (req, res, next) => {

    defaults( req.body );

    /** 
    * customer 
    */

    if( req.body.hasOwnProperty('customer') ){
      if( ! ( /^(0x|0h)?[0-9A-F]+$/i.test(req.body.customer?._id) && req.body.customer._id.length === 24 ) ){
        delete req.body.customer;
      }
    }

    if( !( req.body.hasOwnProperty('_id') && /^(0x|0h)?[0-9A-F]+$/i.test(req.body._id) && req.body._id.length === 24 ) ){
      throw new Error("400 || Veri id`si geçerli değil");
    }

    next();
  }
}