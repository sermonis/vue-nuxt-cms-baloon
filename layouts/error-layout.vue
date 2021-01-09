<template>
  <div>
    <nuxt />
  </div>
</template>
<script>
export default {
  name: "ErrorLayout",
  head() {
    return {
      title: "Page not found",
      meta: [
        { name: "Page not found",hid: "404",content: "the Page you requested is not found"},
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "Balloon CMS" }
      ]
    };
  }
}
</script>
<style>
body {
  background-color: #2f3242;
}
</style>
