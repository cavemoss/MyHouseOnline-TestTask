<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
$green: rgb(66, 177, 66);
$green-light: rgba(66, 177, 66, 0.3);
$red: rgb(222, 64, 64);

button {
  border: none;
  background-color: $green;
  color: white;
  width: 100px;
  height: 36px;
  border-radius: 4px;
  align-self: center;
  box-shadow: 0 6px 6px -2px $green-light;
  transition: all 50ms;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 1;
  }
}
</style>