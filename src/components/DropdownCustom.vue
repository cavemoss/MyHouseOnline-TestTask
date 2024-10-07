<template>
  <div class="container">
    <div class="input">
      <span class="placeholder">{{ name }}</span>
      <input required type="text" placeholder=" " v-model="selected" :style="{ maxWidth: width }">
      <img src="../assets/icons/drop.svg">
    </div>
    <div class="dropdown" :style="{ height: dropdownHeight }">
      <div v-for="(option, index) in options" :key="index" class="option" @click="select(option)">
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropdownCustom',
  props: {
    value: String,
    name: String,
    options: Array,
    setter: Function,
    dropdownHeight: String,
    width: String,
  },
  data() {
    return {
      selected: '',
    }
  },
  methods: {
    select(option) {
      this.selected = option
      this.setter(option)
    }
  },
  mounted() {
    this.selected = this.value
  }
}
</script>

<style lang="scss" scoped>
$green: rgb(66, 177, 66);

.container {
  height: 38px;
  flex: 1;

  &:has(input:focus) .dropdown {
    display: flex;
  }

  .dropdown {
    background-color: white;
    padding: 10px;
    box-shadow: 0 5px 6px 4px #33333330;
    position: relative;
    margin-bottom: -100%;
    display: none;
    flex-direction: column;
    max-height: 40vh;
    overflow: scroll;
    z-index: 3;
    transition: all 100ms;

    .option{
      padding: 4px;
      cursor: pointer;
      
      &:hover {
        background-color: #ddd;
      }
    }

    &:hover {
      display: flex;
    }
  }
}

.input {
  height: 36px;
  border-bottom: 1px solid #aaa;
  display: flex;
  align-items: center;

  .dropdown {
    position: absolute;
    display: flex;
    flex-direction: column;
  }

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