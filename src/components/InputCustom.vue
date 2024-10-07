<template>
  <div class="container" :style="{ alignItems: textarea ? 'baseline' : 'center' }">
    <span class="placeholder">{{ name }}</span>
    <input v-if="!textarea" required :type="type" placeholder=" " @change="select" :value="value"> 
    <textarea v-if="textarea" required placeholder=" " @change="select" v-model="textareaValue"></textarea>
  </div>
</template>

<script>
export default {
  name: 'InputCustom',
  props: {
    value: String,
    name: String,
    setter: Function,
    type: { type: String, default: 'text' },
    textarea: { type: Boolean, default: false }
  },
  methods: {
    select(event) {
      this.setter(event.target.value)
    }
  },
  data() {
    return {
      textareaValue: ''
    }
  },
  mounted() {
    this.textareaValue = this.value
  }
}
</script>

<style lang="scss" scoped>
$green: rgb(66, 177, 66);

.container {
  flex: 1;
  border-bottom: 1px solid #aaa;
  display: flex;

  .dropdown {
    position: absolute;
    display: flex;
    flex-direction: column;
  }

  input {
    flex: 10;
    height: 38px;
    border: none;
    background: none;

    &:focus {
      outline: none;
    }
  }

  textarea {
    resize: vertical;
    width: 100%;
    height: 100px;
    border: none;
    background: none;
    
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

  &:has(input:not(:placeholder-shown)) .placeholder,
  &:has(input:focus) .placeholder
  {
    margin-top: $placeholder-offset;
    color: $green;
  }

  &:has(textarea:not(:placeholder-shown)) .placeholder,
  &:has(textarea:focus) .placeholder
  {
    margin-top: calc($placeholder-offset + 25px);
    color: $green;
  }
}
</style>