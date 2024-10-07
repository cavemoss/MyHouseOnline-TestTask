<template>
  <div class="container">
    <div class="btn" @click="switchPage(1)"><span>&lt;&lt;</span></div>
    <div class="btn" @click="switchPage(page - 1 < 1 ? 1 : page - 1)"><span>&lt;</span></div>

    <div v-if="first !== 1" class="btn" @click="switchPage(1)">
      <span>1</span>
    </div>
    <div v-if="first !== 1" class="btn">...</div>

    <div v-for="(button, index) in buttons" :key="index" 
    class="btn" :class="{ 'highlighted' : button === page }"
    @click="switchPage(button)"
    >
      <span>{{ button }}</span>
    </div>

    <div v-if="last < pages" class="btn">...</div>
    <div v-if="last < pages" class="btn" @click="switchPage(pages)">
      <span>{{ pages }}</span>
    </div>

    <div class="btn" @click="switchPage(page + 1 > pages ? pages : page + 1)"><span>&gt;</span></div>
    <div class="btn" @click="switchPage(pages)"><span>&gt;&gt;</span></div>
  </div>
</template>

<script>
export default {
  name: 'PageScroll',
  props: {
    page: Number,
    pages: Number, 
    pageSize: Number,
  }, 
  methods: {
    switchPage(button) {
      this.$emit('switch-page', button)
    },
    calcPosition() {
      let pages = this.pages 
      let first = (this.page - 2) < 1 ? 1 : (this.page - 2)
      let last = (first + 4) > pages ? (function() {
        first = (pages - 4) < 1 ? 1 : (pages - 4)
        return pages
      })() : (first + 4)

      this.first = first
      this.last = last

      this.buttons = []
      for (let i = first; i <= last; i++) this.buttons.push(i)
    }
  },
  data() {
    return {
      buttons: [],
      first: null,
      last: null,
    }
  },
  mounted() {
    this.calcPosition()
  }, 
}
</script>

<style lang="scss" scoped>
$green: rgb(66, 177, 66);
$green-light: rgba(66, 177, 66, 0.3);

.container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  text-align: center;
  display: flex;
  cursor: pointer;

  &::selection {
    background: none;
  }

  span {
    margin: auto;
  }
}

.highlighted {
  color: white;
  background-color: $green;
  box-shadow: 0 6px 6px -2px $green-light;
}
</style>
