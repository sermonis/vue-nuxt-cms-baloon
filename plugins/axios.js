export default function({ store, app: { $axios }, redirect }) {
  $axios.onRequest(config => {
      config.headers.Authorization = `${store.state.auth.user.id} ${store.state.auth.token}`;
    return config;
  });
}