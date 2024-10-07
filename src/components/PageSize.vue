<template>
  <div style="display: flex; gap: 10px; align-items: center">
    <span>
      <b>{{ page * pageSize - (pageSize - 1) }}</b>-<b>{{ page * pageSize > count ? count : page * pageSize}}</b> из <b>{{ count }}</b> записей 
    </span>
    <DropdownCustom 
    dropdown-height="100px" width="60px" value="40" 
    :options="options" :setter="(value) => $emit('page-size-change', value)" 
    />
  </div>
</template>

<script>
import DropdownCustom from './DropdownCustom.vue'

export default {
  name: 'PageResize',
  props: {
    page: Number, 
    pages: Number, 
    count: Number,
    pageSize: Number
  }, 
  components: {
    DropdownCustom
  },
  data() {
    return {
      options: [],
    }
  },
  mounted() {
    for (let i = 10; i < 200; i += 10) {
      this.options.push(i)
    }
  }
}
</script>
