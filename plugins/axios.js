export default function({ store, $config: { apiSecret }, app: { $axios }, redirect }) {
  $axios.onRequest(config => {
      config.headers.token = apiSecret;
      if(store.state.auth.user){
        config.headers.Authorization = `${store.state.auth.user.id} ${store.state.auth.token}`;
      }
    return config;
  });
}