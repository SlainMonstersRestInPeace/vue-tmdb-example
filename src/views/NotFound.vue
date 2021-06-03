<template lang="pug">
span Invalid Route!
</template>

<script>
export default {
  name: 'NotFound',
  beforeRouteLeave(to, from, next) {
    this.$store.commit('setPreviousRoute', from);

    next();
  }
}
</script>

<style lang="scss" scoped>

</style>