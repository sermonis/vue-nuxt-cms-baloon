<template>
  <div>
    <nuxt />
  </div>
</template>
<script >

export default {
    name: 'ErrorLayout',
    head() {
      return {
        title: "Page not found",
        meta: [
          // hid is used as unique identifier. Do not use `vmid` for it as it will not work
          {
            name: 'Page not found',
            hid: '404',
            content: 'the Page you requested is not found'
          }
        ]
      }
    }
}
</script>
<style>
body {
  background-color: #2f3242;
}
</style>
