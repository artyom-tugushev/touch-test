<template>
  <div class="column q-gutter-x-sm cursor-pointer">
    <span class="street">{{ props.item.street }}</span>
    <span class="city">{{ props.item.city }}</span>
  </div>
</template>

<script setup>
const props = defineProps({ item: Object })
</script>

<style scoped lang="scss">
.street {
  color: #fff;
  font-size: 15px;
}
.city {
  color: $light-secondary;
  font-size: 13px;
}
</style>