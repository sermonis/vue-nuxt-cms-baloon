export default function({ store, app: { $axios }, redirect }) {
  $axios.onRequest(config => {
      config.headers.ip = store.state.ip;
      if(store.state.auth.user){
        config.headers.Authorization = `Bearer ${store.state.auth.token}`;
      }
    return config;
  });
}