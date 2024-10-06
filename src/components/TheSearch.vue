<template>
  <div class="container" @keydown="submit">
    <span class="placeholder">Поиск (&#8470; заявки, название)</span>
    <input type="text" placeholder=" " v-model="prompt">
    <img src="../assets/icons/search.svg">
  </div>
</template>

<script>
export default {
  name: 'TheSearch',
  data() {
    return {
      prompt: ''
    }
  },
  methods: {
    submit(event) {
      if (event.key === 'Enter') {
        if (this.prompt === '') this.$emit('prompted', '')
        else this.$emit('prompted', this.prompt)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$green: rgb(66, 177, 66);
$green-light: rgba(66, 177, 66, 0.3);
$red: rgb(222, 64, 64);

.container {
  flex: 1;
  height: 36px;
  border-bottom: 1px solid #aaa;
  display: flex;
  align-items: center;

  input {
    flex: 10;
    border: none;
    background: none;
    height: 100%;

    &:focus {
      outline: none;
    }
  }

  $placeholder-offset: -46px;

  .placeholder {
    position: absolute;
    font-size: 14px;
    margin-left: 3px;
    transition: all 100ms;
    pointer-events: none;
    color: #aaa;
  }

  &:has(input:not(:placeholder-shown)) .placeholder {
    margin-top: $placeholder-offset;
    color: $green;
  }

  &:has(input:focus) .placeholder {
    margin-top: $placeholder-offset;
    color: $green;
  }
}
</style>