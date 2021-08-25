<template>
  <div id="app">
    <div class="box">
      <h1 class="title">taaaitle</h1>
      <p @click="showData">asssss</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      a: 1111
    }
  },
  methods: {
    showData() {
      const a = 1
      console.log(a);
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  @include my-css();
}
</style>