<template>
  <div class="container">
    <div class="input-container"  >
      <span class="placeholder">{{ name }}</span>
      <input type="text" placeholder=" " v-model="selected" @change="submit">
      <img src="../assets/icons/drop.svg">
    </div>
    <div class="dropdown" @keydown="submit">
      <div v-for="(option, index) in premises" 
      :key="index" :id="option.id" class="option" 
      @click="select(option)"
      >
        {{ option.address }}
      </div>
    </div>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TheDropdown',
  props: {
    name: String,
  },
  computed: {
    ...mapGetters(['premises'])
  },
  data() {
    return {
      selected: '',
      premiseId: null
    }
  },
  methods: {
    select(option) {
      this.selected = option.address
      this.premiseId = option.id
      this.submit()
    },
    submit() {
      if (this.selected === '') this.$emit(`${this.name}-selected`, '')
      else this.$emit(`${this.name}-selected`, this.premiseId)
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
  display: flex;
  flex-direction: column;

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
    max-height: 60vh;
    overflow: scroll;
    z-index: 3;

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

.input-container {
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