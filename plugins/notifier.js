export default ({ app, store }, inject) => {
  inject("notifier", {
    showMessage(data) {
      store.commit("snackbar/showMessage", data);
    }
  });
}