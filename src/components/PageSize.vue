<template>
  <div>
    <b>{{ page * pageSize - (pageSize - 1) }}</b>-<b>{{ page + (pageSize - 1) }}</b> из <b>{{ count }}</b> записей 
    <input type="number" :value="pageSize">
  </div>
</template>

<script>
export default {
  name: 'PageResize',
  props: {
    page: Number, 
    pages: Number, 
    count: Number,
    pageSize: Number
  }, 
  methods: {

  }
}
</script>