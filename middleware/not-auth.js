export default function(context){
    if( context.store.getters['auth/isAuthenticated'] ){
        //context.redirect(context.app.localePath('/'));
        context.redirect('/');
    }
}