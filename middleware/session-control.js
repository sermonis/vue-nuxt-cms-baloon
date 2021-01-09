export default function (context) {
  /*if(process.client){
      context.store.dispatch("initAuth")
  } else {
      context.store.dispatch("initAuth", context.req)
  }
  */
  if (process.client) {
    console.log("client session control");
  } else {
    console.log("server session control");
  }
}
