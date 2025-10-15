<template>
  <div class="column q-gutter-x-sm cursor-pointer">
    <div class="row">
      <span class="street">{{ props.item.street }}</span>
      <img v-if="showArrow" src="/src/assets/icons/down.svg" alt="edit" class="edit-icon icon" />
    </div>
    <span class="city">{{ props.item.city }}</span>
  </div>
</template>

<script setup>
const props = defineProps({ item: { type: Object, required: true }, showArrow: Boolean })
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