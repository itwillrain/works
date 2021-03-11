<template>
  <div :class="$style.logo">
    <img src="~/assets/img/logo.svg" alt="it will rain" />
  </div>
</template>
<style lang="scss" module>
.logo {
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: var(--v-secondary-base);

  img {
    width: 100%;
  }
}
</style>
