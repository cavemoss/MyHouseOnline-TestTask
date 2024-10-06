<template>
  <div class="container">
    <div class="btn"><span>&lt;&lt;</span></div>
    <div class="btn"><span>&lt;</span></div>

    <div v-if="this.first > 1" class="btn" @click="switchPage(1)">
      <span>1</span>
    </div>
    <div v-if="this.first > 1" class="btn">...</div>

    <div v-for="(button, index) in buttons" :key="index" 
    class="btn" :class="{ 'highlighted' : button === page }"
    @click="switchPage(button)"
    >
      <span>{{ button }}</span>
    </div>

    <div v-if="this.pages - this.first > 4" class="btn">...</div>
    <div v-if="this.pages - this.first > 4" class="btn" @click="switchPage(pages)">
      <span>{{ pages }}</span>
    </div>

    <div class="btn"><span>&gt;</span></div>
    <div class="btn"><span>&gt;&gt;</span></div>
  </div>
</template>

<script>
export default {
  name: 'PageScroll',
  props: {
    pages: Number, 
    pageSize: Number,
  }, 
  methods: {
    switchPage(button) {
      this.$emit('switch-page', button)
      this.page = button
      this.calcPosition()
    },
    calcPosition() {
      this.page - 2 > 1 ? this.first = this.page - 2 : this.first = 1
      this.buttons = []

      if (this.pages - this.first <= 4 && this.pages) {
        for (let i = 0; i < 5; i++) this.buttons.push(i + this.pages - 4)
        return
      }

      for (let i = 0; i < 5; i++) this.buttons.push(i + this.first)
    }
  },
  data() {
    return {
      buttons: [],
      page: 1,
      first: 1,
    }
  },
  mounted() {
    this.calcPosition()
  }
}
</script>

<style lang="scss" scoped>
$green: rgb(66, 177, 66);
$green-light: rgba(66, 177, 66, 0.3);
$red: rgb(222, 64, 64);

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
